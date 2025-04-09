import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { SessionService } from 'src/session/session.service';

interface ExpressRequest extends Request {
  cookies: Record<string, string>;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    const token = request.cookies['session'];
    if (!token) return false;
    try {
      await this.sessionService.verifyToken(token);
      return true;
    } catch {
      return false;
    }
  }
}
