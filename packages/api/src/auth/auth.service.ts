import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { compare } from "bcrypt";

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async auth(email: string, pass: string): Promise<any> {
		const user = await this.usersService.findOne(email);
		if (!user) throw new UnauthorizedException();
		const match = await compare(pass, user.password);
		if (!match) {
			throw new UnauthorizedException();
		}
		return { email: user.email };
	}
}
