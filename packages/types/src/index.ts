import type { Request, Response, RequestHandler } from "express";

export { RequestHandler };

export interface RequestParams {
  route: string;
  path: string;
  ipAddress: string;
  body: any;
  query: any;
  params: Request["params"];
  _original: { request: Request; response: Response };
}

export type JsonResponse = any;

export type Route = (params: RequestParams) => JsonResponse;

export interface NordManifest {
  schemaVersion: string;
  createdAt: number;
  routes: Record<string, Route>;
}
