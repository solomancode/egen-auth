import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('api')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @HttpCode(HttpStatus.OK)
  @Post('verify')
  async verify(@Body() dto: { token: string }) {
    if (!dto.token) {
      return false;
    }
    try {
      await this.sessionService.verifyToken(dto.token);
      return true;
    } catch (error) {
      return false;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('token')
  async token(@Body() dto: { id: string; email: string }) {
    const token = await this.sessionService.getToken(dto.id, dto.email);
    return { token };
  }
}
