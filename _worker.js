const API_HOST = "github.com";

async function handleRequest(request, ctx) {
  const url = new URL(request.url);
  const { pathname, search, hash } = url;
  const destinationURL = "https://" + API_HOST + pathname + search + hash;

  let response = await caches.default.match(request);
  if (!response) {
    response = await fetch(destinationURL);
    ctx.waitUntil(caches.default.put(request, response.clone()));
  }

  return response;
}

export default {
  async fetch(request, env, ctx) {
    return handleRequest(request, ctx);
  },

  // Updated CSP configuration
  async setHeaders(event) {
    const { request } = event;
    const headers = new Headers();
    headers.set('Content-Security-Policy', `script-src 'self' cf-workers-git.pages.dev git.sveil.com github.githubassets.com;`);
    return new Response(null, {
      headers,
    });
  },
};
