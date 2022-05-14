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
