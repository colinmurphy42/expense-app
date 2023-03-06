import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class CustomInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return handler.handle().pipe(
      map((data) => {
        const response = {
          ...data,
          createdAt: data.created_at,
        };
        delete response.updated_at;
        delete response.created_at;
        return response;
      }),
    );
  }
}
