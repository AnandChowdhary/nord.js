import type { Route, RequestParams } from "@nordjs/types";
import { getClientIp } from "@supercharge/request-ip";

export const injectRoutes = async (params?: {
  method: Route;
  route: string;
  request: RequestParams<any, any>["_original"]["request"];
  response: RequestParams<any, any>["_original"]["response"];
}): Promise<void> => {
  if (typeof params === "undefined") return;
  const { method, route, request, response } = params;

  // TODO validate request.body, query, params

  const result = await method({
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
};
