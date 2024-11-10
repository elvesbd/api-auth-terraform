import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersRepository } from 'src/repository/users.repository';
import { TokenPayload } from 'src/shared/types';

type Input = {
  email: string;
  password: string;
};

type Output = { accessToken: string };

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async login(input: Input): Promise<Output> {
    const user = await this.userRepository.getUserByEmail(input.email);
    const passwordMatch = await compare(input.password, user?.password ?? '');
    if (!user || !passwordMatch)
      throw new UnauthorizedException('invalid credentials!');

    const payload: TokenPayload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
      iat: Math.floor(Date.now()),
      aud: 'Elves',
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: '/q05tfiCZca/QJ02iP38Vg6xZyuOqF8rQyAs8bkgoXI=',
    });

    return {
      accessToken,
    };
  }
}
