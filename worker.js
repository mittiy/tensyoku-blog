const CANONICAL_HOST = "genba-tensyoku.com";

// Hosts that should permanently redirect to the canonical domain.
// Preview deployments (*-tensyoku-blog.….workers.dev) are left untouched.
const REDIRECT_HOSTS = [
  "tensyoku-blog.m-kondo1237-xk.workers.dev",
  "www.genba-tensyoku.com",
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (REDIRECT_HOSTS.includes(url.hostname)) {
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
