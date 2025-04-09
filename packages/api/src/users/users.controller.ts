import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { validate } from '@egen/validation';
import { UsersService } from './users.service';

@Controller('api')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async signup(@Body() dto: { email: string; name: string; password: string }) {
    if (!dto) {
      throw new BadRequestException('Missing signup dto');
    }
    const { email, name, password } = dto;
    const vEmail = validate.email(email);
    if (vEmail.valid === false) {
      throw new BadRequestException(vEmail.message);
    }
    const vPassword = validate.password(password);
    if (vPassword.valid === false) {
      throw new BadRequestException(vPassword.message);
    }
    const vUsername = validate.username(name);
    if (vUsername.valid === false) {
      throw new BadRequestException(vUsername.message);
    }
    console.log('created:', email, password);
    const created = await this.usersService.createOne(email, name, password);
    if (created['error']) {
      throw new BadRequestException(created['error']);
    } else {
      return created;
    }
  }
}
