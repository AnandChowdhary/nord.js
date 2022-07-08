import type { Request, Response } from "express";

export interface RequestParams {
  route: string;
  path: string;
  ipAddress: string;
  body: (BodyDto?: abstract new (...args: any) => any) => typeof BodyDto;
  query: (QueryDto?: abstract new (...args: any) => any) => typeof QueryDto;
  params: Request["params"];
  _original: { request: Request; response: Response };
}

export type JsonResponse = any;

export type Route = (params: RequestParams) => JsonResponse;
