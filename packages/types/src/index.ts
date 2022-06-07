import type { Request, Response } from "express";

export interface RequestParams<Body, Query> {
  route: string;
  path: string;
  ipAddress: string;
  body: (schema?: Body) => Body;
  query: (schema?: Query) => Query;
  params: Request["params"];
  _original: { request: Request; response: Response };
}

export type JsonResponse = any;

export type Route<
  Combined extends { body?: any; query?: any } = {
    body?: any;
    query?: any;
  }
> = (
  params: RequestParams<Combined["body"], Combined["query"]>
) => JsonResponse;
