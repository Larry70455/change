#!/usr/bin/env python3
"""Plan, stage, or deploy a version of the existing Grimoire Cloudflare Worker."""

import argparse
import base64
import gzip
import hashlib
import json
import os
import re
import sys
import uuid
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import quote
from urllib.request import Request, urlopen

HERE = Path(__file__).resolve().parent
CONFIG = json.loads((HERE / 'deployment.json').read_text())
WORKER = f"/accounts/{CONFIG['account']}/workers/scripts/{CONFIG['worker']}"
KV = next(binding for binding in CONFIG['bindings'] if binding['type'] == 'kv_namespace')
NAMESPACE = f"/accounts/{CONFIG['account']}/storage/kv/namespaces/{KV['namespace_id']}"


def digest(data):
    return hashlib.sha256(data).hexdigest()


def read_web():
    raw = (HERE.parent / 'index.html').read_bytes()
    if b'function createGreatWork(' not in raw:
        raise ValueError('The game engine is missing from index.html.')
    release = 'great-work-deck-' + digest(raw)[:10]
    compressed = gzip.compress(raw, mtime=0)
    storage = f'{release}-{digest(compressed)[:12]}'
    by_key = {
        f'{storage}/index.html.gz.{seq}': compressed[offset:offset + 150_000]
        for seq, offset in enumerate(range(0, len(compressed), 150_000))
    }
    return raw, release, by_key


def read_art():
    folder = HERE.parent / 'assets' / 'fronts-92-marks'
    files = {f'/assets/fronts-92-marks/{path.name}': path.read_bytes()
             for path in sorted(folder.glob('*.webp'))}
    if len(files) != 91 or any(data[:4] != b'RIFF' or data[8:12] != b'WEBP' for data in files.values()):
        raise ValueError('Expected 90 current card faces and one WebP back.')
    art_key = 'great-work-art-' + digest(
        ''.join(f'{key} {digest(value)}\n' for key, value in files.items()).encode()
    )[:10]
    return art_key, {art_key + key: value for key, value in files.items()}


def api(method, path, payload=None, content_type='application/json', raw=False):
    token = os.environ['CLOUDFLARE_API_TOKEN']
    body = json.dumps(payload).encode() if payload is not None and content_type == 'application/json' else payload
    request = Request('https://api.cloudflare.com/client/v4' + path, method=method, data=body,
                      headers={'Authorization': 'Bearer ' + token, 'Content-Type': content_type})
    try:
        with urlopen(request, timeout=45) as response:
            result = response.read()
    except HTTPError as error:
        raise RuntimeError(f'{method} {path} returned HTTP {error.code}: '
                           f'{error.read(1_300).decode(errors="replace")}') from None
    if raw:
        return result
    envelope = json.loads(result)
    if not envelope['success']:
        raise RuntimeError(f'{method} {path}: {envelope.get("errors")}')
    return envelope.get('result')


def multipart(metadata, modules):
    boundary = 'grimoire-' + uuid.uuid4().hex
    output = bytearray()
    parts = [('metadata', 'application/json', json.dumps(metadata).encode())]
    parts += [(name, 'application/javascript+module', value) for name, value in modules.items()]
    for name, kind, value in parts:
        filename = '' if name == 'metadata' else f'; filename="{name}"'
        output += (f'--{boundary}\r\nContent-Disposition: form-data; name="{name}"{filename}\r\n'
                   f'Content-Type: {kind}\r\n\r\n').encode() + value + b'\r\n'
    output += f'--{boundary}--\r\n'.encode()
    return bytes(output), f'multipart/form-data; boundary={boundary}'


def version_at_100():
    deployments = api('GET', WORKER + '/deployments')['deployments']
    versions = deployments[0]['versions']
    if len(versions) != 1 or versions[0]['percentage'] != 100:
        raise RuntimeError('The Worker has a split deployment. Review it before changing traffic.')
    return versions[0]['version_id']


def require_version(expected):
    actual = version_at_100()
    if actual != expected:
        raise RuntimeError(f'Current version is {actual}, expected {expected}. Check upstream changes first.')


def upload(contents, *, art=False):
    entries = [
        {'key': key, 'value': base64.b64encode(value).decode(), 'base64': True,
         **({'metadata': {'sha256': digest(value)}} if art else {})}
        for key, value in contents.items()
    ]
    for offset in range(0, len(entries), 8):
        result = api('PUT', NAMESPACE + '/bulk', entries[offset:offset + 8])
        if (result or {}).get('unsuccessful_keys'):
            raise RuntimeError(f'Incomplete KV write: {result["unsuccessful_keys"]}')
    for key, data in contents.items():
        saved = api('GET', NAMESPACE + '/values/' + quote(key, safe=''), raw=True)
        if digest(saved) != digest(data):
            raise RuntimeError(f'KV verification failed for {key}.')


def new_version(expected, art_release, html_release, keys, message):
    baseline = api('GET', WORKER + '/versions/' + expected)['resources']
    runtime = baseline['script_runtime']
    metadata = {
        'main_module': 'worker.mjs', 'keep_assets': True,
        'compatibility_date': runtime['compatibility_date'],
        'compatibility_flags': runtime.get('compatibility_flags', []),
        'usage_model': runtime.get('usage_model', 'standard'),
        'bindings': CONFIG['bindings'],
        'annotations': {'workers/message': message},
    }
    modules = {name: (HERE / name).read_bytes() for name in ('worker.mjs', 'legacy.mjs')}
    modules['release.mjs'] = (
        f'export const release={json.dumps(art_release)};\n'
        f'export const htmlRelease={json.dumps(html_release)};\n'
        f'export const htmlKeys={json.dumps(list(keys))};\n'
    ).encode()
    body, kind = multipart(metadata, modules)
    created = api('POST', WORKER + '/versions', body, kind)['id']
    staged = api('GET', WORKER + '/versions/' + created)['resources']
    if staged['bindings'] != baseline['bindings'] or staged['script_runtime'].get('assets') != runtime.get('assets'):
        raise RuntimeError('Worker bindings or static asset settings changed. Production traffic was not moved.')
    return created


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument('--stage', action='store_true', help='Upload into new keys and create an inactive Worker version')
    mode.add_argument('--deploy', metavar='VERSION_ID', help='Move all traffic to an existing staged or rollback version')
    parser.add_argument('--expected-version', default=CONFIG['versions'][0]['version_id'])
    parser.add_argument('--art-release', help='Existing art key prefix if it has changed since this snapshot')
    parser.add_argument('--publish-art', action='store_true', help='Stage the included current art under a new hash prefix')
    parser.add_argument('--message', default='Update The Great Work')
    args = parser.parse_args()
    raw, html_release, keys = read_web()
    baseline_art = re.search(r'export const release="([^"]+)"', (HERE / 'release.mjs').read_text())[1]
    art_release, art = read_art() if args.publish_art else (args.art_release or baseline_art, {})
    print(json.dumps({'html': html_release, 'sha256': digest(raw), 'html_parts': len(keys),
                      'art': art_release, 'art_uploads': len(art)}, indent=2))
    if not (args.stage or args.deploy):
        return
    if 'CLOUDFLARE_API_TOKEN' not in os.environ:
        parser.error('Set CLOUDFLARE_API_TOKEN in the environment, or use the Cloudflare connector.')
    require_version(args.expected_version)
    if args.stage:
        upload(keys)
        if art:
            upload(art, art=True)
        require_version(args.expected_version)
        print('Staged version:', new_version(args.expected_version, art_release, html_release, keys, args.message))
    else:
        api('GET', WORKER + '/versions/' + args.deploy)
        require_version(args.expected_version)
        deployment = api('POST', WORKER + '/deployments', {
            'strategy': 'percentage',
            'versions': [{'version_id': args.deploy, 'percentage': 100}],
            'annotations': {'workers/message': args.message},
        })
        print('Deployment:', deployment['id'])
        print('Verify both game URLs and the release header against the staged candidate.')


if __name__ == '__main__':
    try:
        main()
    except (ValueError, RuntimeError) as error:
        sys.exit(str(error))
