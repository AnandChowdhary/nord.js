import type {
  Route,
  RequestParams,
  RequestHandler,
  NordManifest,
} from "@nordjs/types";
import { getClientIp } from "@supercharge/request-ip";

export const injectRoutes: (
  manifestFunction: () => Promise<NordManifest>
) => RequestHandler = (manifestFunction) => {
  return async (request, response, next) => {
    const { routes } = await manifestFunction();
    const route =
      routes[
        `${request.method === "HEAD" ? "GET" : request.method} ${request.path}`
      ];
    if (!route) return next();

    const result = await route({
      route,
      path: request.path,
      query: request.query,
      params: request.params,
      body: request.body,
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
