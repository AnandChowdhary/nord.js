import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

interface IHttpException {
  status: StatusCodes;
  error: string;
}

export class HttpException extends Error {
  original: IHttpException;
  constructor(params: IHttpException) {
    super(params.error);
    this.original = params;
  }
}

export const baseErrorHandler = ({
  request,
  response,
  error,
}: {
  request: Request;
  response: Response;
  error: HttpException;
}): Response => {
  return response.status(error.original.status).json(error.original);
};

export class BadRequestException extends Error {}
export class UnauthorizedException extends Error {}
export class NotFoundException extends Error {}
export class ForbiddenException extends Error {}
export class NotAcceptableException extends Error {}
export class RequestTimeoutException extends Error {}
export class ConflictException extends Error {}
export class GoneException extends Error {}
export class HttpVersionNotSupportedException extends Error {}
export class PayloadTooLargeException extends Error {}
export class UnsupportedMediaTypeException extends Error {}
export class UnprocessableEntityException extends Error {}
export class InternalServerErrorException extends Error {}
export class NotImplementedException extends Error {}
export class ImATeapotException extends Error {}
export class MethodNotAllowedException extends Error {}
export class BadGatewayException extends Error {}
export class ServiceUnavailableException extends Error {}
export class GatewayTimeoutException extends Error {}
export class PreconditionFailedException extends Error {}
