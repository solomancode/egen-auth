import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SessionService {
  constructor(private jwtService: JwtService) {}

  async getToken(sub: string, email: string) {
    return this.jwtService.signAsync({ sub, email });
  }

  async verifyToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}
