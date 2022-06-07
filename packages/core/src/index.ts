import type { Route } from "@nordjs/types";
import type { Request, Response } from "express";
import { getClientIp } from "@supercharge/request-ip";

export const injectRoutes = async (params?: {
  method: Route;
  route: string;
  request: Request;
  response: Response;
}): Promise<void> => {
  if (typeof params === "undefined") return;
  const { method, route, request, response } = params;

  const result = await method({
    route,
    path: request.path,
    query: () => ({}),
    params: () => ({}),
    ipAddress: getClientIp(request),
    body: <T>(schema?: T) => {
      const body = request.body;
      // TODO validate body
      return body as unknown as T;
    },
    _original: { request, response },
  });
  if (request.method === "HEAD") response.status(204);
  else response.json(result);
};
