import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Request, Response } from "express";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);

    intercept(context:ExecutionContext, next: CallHandler): Observable<any> {
        const http = context.switchToHttp();
        const request = http.getRequest<Request>();
        const response = http.getResponse<Response>();
        const { method, url } = request;
        const status = response.statusCode;
        const now = Date.now();

        return next.handle().pipe(
            tap(() => {
          const duration = Date.now() - now;

          this.logger.log(
            `${request.method} ${request.url} ${status} ${duration}ms`,
          );
            }))
}
}