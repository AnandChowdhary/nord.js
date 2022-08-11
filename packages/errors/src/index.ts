import { HttpStatus } from "./http-status";
export { HttpStatus };

export class HttpException extends Error {
  code: number;
  _httpException = true;

  constructor({ code, message }: { code: number; message: string }) {
    super(message);
    this.code = code;
  }
}

export class BadGatewayException extends HttpException {
  constructor(message: string) {
    super({ code: HttpStatus.BAD_GATEWAY, message });
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super({ code: HttpStatus.BAD_REQUEST, message });
  }
}

export class ConflictException extends HttpException {
  constructor(message: string) {
    super({ code: HttpStatus.CONFLICT, message });
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string) {
    super({ code: HttpStatus.FORBIDDEN, message });
  }
}

export class GatewayTimeoutException extends HttpException {
  constructor(message: string) {
    super({ code: HttpStatus.GATEWAY_TIMEOUT, message });
  }
}

export class GoneException extends HttpException {
  constructor(message: string) {
    super({ code: HttpStatus.GONE, message });
  }
}

export class HttpVersionNotSupportedException extends HttpException {
  constructor(message: string) {
    super({ code: HttpStatus.HTTP_VERSION_NOT_SUPPORTED, message });
  }
}

export class ImATeapotException extends HttpException {
  constructor(message: string) {
    super({ code: HttpStatus.I_AM_A_TEAPOT, message });
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string) {
    super({ code: HttpStatus.INTERNAL_SERVER_ERROR, message });
  }
}

export class MethodNotAllowedException extends HttpException {
  constructor(message: string) {
    super({ code: HttpStatus.METHOD_NOT_ALLOWED, message });
  }
}

export class MisdirectedException extends HttpException {
  constructor(message: string) {
    super({ code: HttpStatus.MISDIRECTED, message });
  }
}

export class NotAcceptableException extends HttpException {
  constructor(message: string) {
    super({ code: HttpStatus.NOT_ACCEPTABLE, message });
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super({ code: HttpStatus.NOT_FOUND, message });
  }
}

export class NotImplementedException extends HttpException {
  constructor(message: string) {
    super({ code: HttpStatus.NOT_IMPLEMENTED, message });
  }
}

export class PayloadTooLargeException extends HttpException {
  constructor(message: string) {
    super({ code: HttpStatus.PAYLOAD_TOO_LARGE, message });
  }
}

export class PreconditionFailedException extends HttpException {
  constructor(message: string) {
    super({ code: HttpStatus.PRECONDITION_FAILED, message });
  }
}

export class RequestTimeoutException extends HttpException {
  constructor(message: string) {
    super({ code: HttpStatus.REQUEST_TIMEOUT, message });
  }
}

export class ServiceUnavailableException extends HttpException {
  constructor(message: string) {
    super({ code: HttpStatus.SERVICE_UNAVAILABLE, message });
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super({ code: HttpStatus.UNAUTHORIZED, message });
  }
}

export class UnprocessableEntityException extends HttpException {
  constructor(message: string) {
    super({ code: HttpStatus.UNPROCESSABLE_ENTITY, message });
  }
}

export class UnsupportedMediaTypeException extends HttpException {
  constructor(message: string) {
    super({ code: HttpStatus.UNSUPPORTED_MEDIA_TYPE, message });
  }
}
