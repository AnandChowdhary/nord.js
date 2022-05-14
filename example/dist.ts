import express from "express";
import type { Request, Response } from "express";

export interface RequestParams {
  request: Request;
  response: Response;
}

export type JsonResponse = any;

export type Route = (params: RequestParams) => JsonResponse;

const app = express();
const port = 3000;

import { get as get_ } from "./routes/";

app.get("/", (request, response) => {
  return transformResponse({ route: get_, request, response });
});

app.head("/", (request, response) => {
  return transformResponse({ route: get_, request, response });
});

import { get as get_success } from "./routes/success";

app.get("/success", (request, response) => {
  return transformResponse({ route: get_success, request, response });
});

app.head("/success", (request, response) => {
  return transformResponse({ route: get_success, request, response });
});

import { post as post_success } from "./routes/success";

app.post("/success", (request, response) => {
  return transformResponse({ route: post_success, request, response });
});

// inject-routes

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export const transformResponse = async ({
  route,
  request,
  response,
}: {
  route: Route;
  request: Request;
  response: Response;
}): Promise<void> => {
  const result = await route({ request, response });
  if (request.method === "HEAD") response.status(204);
  else response.json(result);
};
