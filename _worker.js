const API_HOST = "github.com"

async function handleRequest(request, ctx) {
    const url = new URL(request.url)
    const { pathname, search, hash } = url
    const destinationURL = "https://" + API_HOST + pathname + search + hash
    let response = await caches.default.match(request)
    if (!response) {
        response = await fetch(destinationURL)
        ctx.waitUntil(caches.default.put(request, response.clone()))
    }

    return response
}

export default {
    async fetch(request, env, ctx) {
        return handleRequest(request, ctx);
    }
};
