import type { NordManifest, RequestHandler } from "@nordjs/types";
import { getClientIp } from "@supercharge/request-ip";

export const injectRoutes: (
  manifestFunction: () => Promise<NordManifest>
) => RequestHandler = (manifestFunction) => {
  return async (request, response, next) => {
    const { routes } = await manifestFunction();
    const key = `${request.method === "HEAD" ? "GET" : request.method} ${
      request.path
    }`;
    const route = routes[key];
    if (!route) return next();

    const result = route({
      route: key,
      path: request.path,
      params: request.params,
      query: (obj) => obj.parse(request.query) as any,
      body: (obj) => obj.parse(request.body) as any,
      ipAddress: getClientIp(request),
      _original: { request, response },
    });

    if (request.method === "HEAD") {
      response.status(204);
      response.end();
    } else response.json(result);

    return next();
  };
};
