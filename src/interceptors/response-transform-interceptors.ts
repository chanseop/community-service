import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
import { Reflector } from "@nestjs/core";
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  export interface Response<T> {
    message: string;
    statusCode: number;
    result: T;
  }
  
  @Injectable()
  export class ResponseTransformInterceptor<T>
    implements NestInterceptor<T, Response<T>>
  {
    constructor (private reflector: Reflector) {}

    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<Response<T>> {
      const messageFromResponseMsgMetaData = this.reflector.get<string>('response-message', context.getHandler());

      const currentStatusCode = context.switchToHttp().getResponse().statusCode;
      return next.handle().pipe(
        map((data) => ({
          message: messageFromResponseMsgMetaData || '요청이 성공하였습니다.',
          statusCode: currentStatusCode,
          result: data,
        })),
      );
    }
  }
  