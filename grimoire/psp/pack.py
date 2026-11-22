#!/usr/bin/env python3
"""Replace the QuickJS payload in the known Build 20 PSP executable."""
import argparse
from io import BytesIO
import json
from pathlib import Path
import re
import struct
from zipfile import ZIP_DEFLATED, ZipFile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
ENTRY = 'PSP/GAME/GreatWork/EBOOT.PBP'
BASE = HERE / 'reference' / 'The_Great_Work_PSP_Build_20.zip'
ART_TABLE = 0x159780
ART_START = 0x1598F0
ART_CAPACITY = 3_769_101
ATLAS = 0x8D75B00 - 0x8803F00
ATLAS_SIZE = 128
ICON_LIMIT = 0x8805C64 - 0x8803F00
DECK_MARKER = b'const DECK=['


def extract_deck(script):
    if not script.startswith(DECK_MARKER):
        raise ValueError('PSP script must start with const DECK=[ without spaces.')
    return json.JSONDecoder().raw_decode(script[len(b'const DECK='):].decode())[0]


def texture_deck(deck):
    by_index = {card['tex']: card['id'] for card in deck}
    if len(deck) != 90 or set(by_index) != set(range(90)) or len(set(by_index.values())) != 90:
        raise ValueError('The renderer expects 90 unique card textures numbered 0 through 89.')
    return [by_index[i] for i in range(90)]


def artwork(elf, ids):
    from PIL import Image
    web = ROOT / 'web'
    by_id = {card['id']: card['front'] for card in json.loads(
        (ROOT / 'shared' / 'deck.current.json').read_text()
    )}
    paths = [web / by_id[cid] for cid in ids] + [web / 'assets/fronts-92-marks/shared-back-upright.webp']
    images = []
    for path in paths:
        with Image.open(path) as source:
            images.append(source.convert('RGB').resize((256, 349), Image.Resampling.LANCZOS))
    for quality in range(94, 69, -1):
        offsets, blob = [0], bytearray()
        for image in images:
            output = BytesIO()
            image.save(output, 'JPEG', quality=quality, subsampling=0, optimize=True)
            blob.extend(output.getvalue())
            offsets.append(len(blob))
        if len(blob) <= ART_CAPACITY:
            break
    else:
        raise ValueError('Textures exceed the fixed JPEG region at the supported quality settings.')
    struct.pack_into('<92I', elf, ART_TABLE, *offsets)
    elf[ART_START:ART_START + ART_CAPACITY] = blob.ljust(ART_CAPACITY, b'\0')
    print(f'Artwork rebuilt at JPEG quality {quality}.')


def atlas(elf, png):
    from PIL import Image
    with Image.open(png) as source:
        if source.size != (ATLAS_SIZE, ATLAS_SIZE):
            raise ValueError('Icon atlas must be 128x128.')
        pixels = source.convert('RGBA').tobytes()
    for i in range(ATLAS_SIZE * ATLAS_SIZE):
        rgba = pixels[4 * i:4 * i + 4]
        packed = sum(((value + 8) // 17) << (4 * channel) for channel, value in enumerate(rgba))
        struct.pack_into('<H', elf, ATLAS + 2 * i, packed)


def pack(source, output, render_art=False, icon_atlas=None):
    updated = source.read_bytes()
    if bytes(1) in updated:
        raise ValueError('The PSP script cannot contain NUL bytes.')
    mapping = texture_deck(extract_deck(updated))
    with ZipFile(BASE) as reference:
        binary = reference.read(ENTRY)
        data_start, data_end = struct.unpack_from('<II', binary, 32)
        elf = bytearray(binary[data_start:data_end])
        if not elf.startswith(b'\x7fELF') or struct.unpack_from('<I', elf, ICON_LIMIT)[0] != 0x2c42002a:
            raise ValueError('Reference EBOOT does not match the Build 20 ELF layout.')
        if elf.count(DECK_MARKER) != 1:
            raise ValueError('Expected one embedded QuickJS script in the reference EBOOT.')
        start = elf.index(DECK_MARKER)
        end = elf.index(0, start)
        if not render_art and mapping != texture_deck(extract_deck(elf[start:end])):
            raise ValueError('Texture order changed. Sync the web deck then rerun with --artwork.')
        if len(updated) > end - start:
            raise ValueError(f'Script needs {len(updated)} bytes. This EBOOT allocates only {end - start}.')
        elf[start:end] = updated.ljust(end-start)
        if render_art:
            artwork(elf, mapping)
        if icon_atlas:
            atlas(elf, icon_atlas)
        binary = binary[:data_start] + elf + binary[data_end:]
        output.parent.mkdir(parents=True, exist_ok=True)
        with ZipFile(output, 'w', ZIP_DEFLATED, compresslevel=9) as archive:
            archive.writestr(ENTRY, binary)
            for name in reference.namelist():
                if name != ENTRY:
                    archive.writestr(name, reference.read(name))
    with ZipFile(output) as archive:
        if archive.testzip() is not None or archive.read(ENTRY) != binary:
            raise RuntimeError('Output ZIP integrity check failed.')
    print(f'{output} ({len(updated)}/{end-start} script bytes)')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, default=HERE / 'game.js')
    parser.add_argument('--out', type=Path, default=HERE / 'build' / 'The_Great_Work_PSP.zip')
    parser.add_argument('--artwork', action='store_true', help='Regenerate JPEG textures from the current 90-card web deck')
    parser.add_argument('--atlas', type=Path, help='Install a replacement 128x128 RGBA icon atlas')
    args = parser.parse_args()
    if args.out.resolve() == BASE.resolve():
        parser.error('Choose an output path outside the reference ZIP.')
    pack(args.source, args.out, args.artwork, args.atlas)
