import legacy from './legacy.mjs';
import {release, htmlRelease, htmlKeys} from './release.mjs';

const gamePrefix = '/great-work';
const cssAssetPrefix = '/assets/fronts-92-marks/';
const htmlPaths = new Set(['/', '/index.html', '/great-work/']);
const responseHeaders = {'x-content-type-options': 'nosniff'};

async function serveIndex(request, env) {
  const segments = await Promise.all(htmlKeys.map(key => env.GREAT_WORK_RELEASES.get(key, 'arrayBuffer')));
  if (segments.some(part => part === null)) return null;
  const headers = {
    ...responseHeaders,
    'content-type': 'text/html; charset=utf-8',
    'cache-control': 'no-cache',
    'x-grimoire-release': htmlRelease,
  };
  if (request.method === 'HEAD') return new Response(null, {headers});
  const stream = new ReadableStream({
    start(controller) {
      for (const part of segments) controller.enqueue(new Uint8Array(part));
      controller.close();
    },
  });
  return new Response(stream.pipeThrough(new DecompressionStream('gzip')), {headers});
}

async function serveArt(request, env, pathname) {
  const {value, metadata} = await env.GREAT_WORK_RELEASES.getWithMetadata(release + pathname, 'arrayBuffer');
  if (value === null) return new Response('Artwork unavailable', {status: 404});
  const headers = {
    ...responseHeaders,
    'content-type': 'image/webp',
    'content-length': String(value.byteLength),
    'cache-control': 'public, max-age=86400',
    ...(metadata?.sha256 ? {etag: '"' + metadata.sha256 + '"'} : {}),
  };
  if (headers.etag && request.headers.get('if-none-match') === headers.etag) {
    delete headers['content-length'];
    return new Response(null, {status: 304, headers});
  }
  return new Response(request.method === 'HEAD' ? null : value, {headers});
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === 'GET' || request.method === 'HEAD') {
      const pathname = url.pathname;
      if (pathname === gamePrefix) {
        url.pathname += '/';
        return Response.redirect(url, 308);
      }
      if (htmlPaths.has(pathname)) {
        const response = await serveIndex(request, env);
        if (response) return response;
        if (pathname === gamePrefix + '/') {
          return new Response('The Great Work is temporarily unavailable.', {status: 503});
        }
      }
      const isGameAsset = pathname.startsWith(gamePrefix + '/assets/');
      const assetPath = isGameAsset ? pathname.slice(gamePrefix.length) : pathname;
      if (assetPath.startsWith(cssAssetPrefix) && /^[a-z0-9-]+\.webp$/.test(assetPath.slice(cssAssetPrefix.length))) {
        return serveArt(request, env, assetPath);
      }
      if (isGameAsset) {
        url.pathname = assetPath;
        return env.ASSETS.fetch(new Request(url, request));
      }
    }
    return legacy.fetch(request, env, ctx);
  },
};
