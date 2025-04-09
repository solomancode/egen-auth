import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { validate } from '@egen/validation';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';

class ProtectedContent {
  @ApiProperty({ example: 'secret', description: 'a secret' })
  secret: string;
}

@Controller('api')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('auth')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: Record<string, any>) {
    if (!dto) {
      throw new BadRequestException('Missing auth dto');
    }
    const { email, password } = dto;
    const vEmail = validate.email(email);
    if (vEmail.valid === false) {
      throw new BadRequestException(vEmail.message);
    }
    const vPassword = validate.password(password);
    if (vPassword.valid === false) {
      throw new BadRequestException(vPassword.message);
    }
    return this.auth.auth(email, password);
  }

  @Get('protected')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'A protected endpoint',
    type: ProtectedContent,
  })
  async protected() {
    return { secret: 'secret 🥷' };
  }
}
