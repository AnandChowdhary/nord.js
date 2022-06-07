import express from "express";
import { getClientIp } from "@supercharge/request-ip";
import type { Request, Response } from "express";
import type { Route } from "@nordjs/types";

const app = express();
const port = 3000;

import { get as get_ } from "./routes/";
app.get("/", (request, response) => {
  return transformResponse({ method: get_, route: "/", request, response });
});
app.head("/", (request, response) => {
  return transformResponse({ method: get_, route: "/", request, response });
});
import { get as get_success } from "./routes/success";
app.get("/success", (request, response) => {
  return transformResponse({ method: get_success, route: "/success", request, response });
});
app.head("/success", (request, response) => {
  return transformResponse({ method: get_success, route: "/success", request, response });
});
import { post as post_success } from "./routes/success";
app.post("/success", (request, response) => {
  return transformResponse({ method: post_success, route: "/success", request, response });
});
// inject-routes

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export const transformResponse = async ({
  method,
  route,
  request,
  response,
}: {
  method: Route;
  route: string;
  request: Request;
  response: Response;
}): Promise<void> => {
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
