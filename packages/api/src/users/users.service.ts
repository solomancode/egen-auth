import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(email: string): Promise<User | null> {
    return this.userModel.findOne<User>({ email });
  }

  async hashPassword(password: string) {
    return hash(password, 12);
  }

  async createOne(
    email: string,
    name: string,
    password: string,
  ): Promise<Omit<User, 'password'> | { error: string }> {
    const user: User = {
      email,
      name,
      password: await this.hashPassword(password),
    };
    const created = new this.userModel(user);
    try {
      await created.save();
      return user;
    } catch (error) {
      // duplicate error
      if (error.code === 11000) {
        return { error: 'eamil already taken' };
      } else {
        return { error: 'Failed to create user' };
      }
    }
  }
}
