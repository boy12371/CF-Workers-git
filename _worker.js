const API_HOST = "github.com"

const statusCode = 301
async function handleRequest(request) {
    const url = new URL(request.url)
    const { pathname, search, hash } = url
    const destinationURL = "https://" + API_HOST + pathname + search + hash
    return Response.redirect(destinationURL, statusCode)
}

export default {
    async fetch(request, env, ctx) {
        return handleRequest(request, ctx);
    }
};
