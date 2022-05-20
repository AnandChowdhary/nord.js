import type { Request, Response } from "express";

export interface RequestParams {
  route: string;
  path: string;
  ipAddress: string;
  body: <T>(schema?: T) => T;
  _original: { request: Request; response: Response };
}

export type JsonResponse = any;

export type Route = (params: RequestParams) => JsonResponse;
