import { REDIRECTS, dynamicInventoryRedirect, isVehicleDetailRoute } from '../lib/redirects.cjs';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // 301 Permanent Redirects for legacy/English routes
    if (REDIRECTS[pathname]) {
      url.pathname = REDIRECTS[pathname];
      return Response.redirect(url.toString(), 301);
    }

    // Dynamic /inventory/:slug redirect to /inventario/:slug
    const invTarget = dynamicInventoryRedirect(pathname);
    if (invTarget) {
      url.pathname = invTarget;
      return Response.redirect(url.toString(), 301);
    }

    // Dynamic vehicle detail route rewrites for static asset serving
    if (isVehicleDetailRoute(pathname)) {
      const rewriteUrl = new URL(request.url);
      rewriteUrl.pathname = '/coche.html';
      rewriteUrl.search = '';
      return env.ASSETS.fetch(rewriteUrl.toString());
    }

    return env.ASSETS.fetch(request);
  },
};

