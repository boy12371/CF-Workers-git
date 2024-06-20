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
	headers.delete('content-security-policy')
	headers.delete('content-security-policy-report-only')
	headers.delete('clear-site-data')
    // headers.set('Content-Security-Policy', `script-src 'self' *.pages.dev *.sveil.com github.githubassets.com;`);
    return new Response(null, {
      headers,
    });
  },
};
