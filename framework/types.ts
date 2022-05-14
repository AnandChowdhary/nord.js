import type { Request, Response } from "express";

export interface RequestParams {
  request: Request;
  response: Response;
}

export type JsonResponse = any;

export type Route = (params: RequestParams) => JsonResponse;
