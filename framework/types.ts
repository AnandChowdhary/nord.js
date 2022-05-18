import type Joi from "joi";
import type { Request, Response } from "express";

export interface RequestParams {
  request: Request;
  response: Response;
  body: <T>(schema?: Joi.PartialSchemaMap<T>) => T;
}

export type JsonResponse = any;

export type Route = (params: RequestParams) => JsonResponse;
