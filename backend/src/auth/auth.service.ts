import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Wrong email');
    }
    if (!bcrypt.compareSync(pass, user.password)) {
      throw new UnauthorizedException('Wrong password');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async signIn(user: Partial<User>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, updatedAt, ...payload } = user;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.userService.findOneByEmail(createUserDto.email);
    if (user) {
      throw new UnauthorizedException('Email already in use');
    }
    createUserDto.password = bcrypt.hashSync(
      createUserDto.password,
      bcrypt.genSaltSync(10),
    );
    return await this.userService.create(createUserDto);
  }
  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
