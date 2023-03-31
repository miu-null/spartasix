import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ButtonUserIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const buttonUserId = request.user ? request.user : null;
    // 전역 변수로 설정
    global.buttonUserId = buttonUserId;
    return next.handle();
  }
}
