import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { User } from 'src/domain/user';
import { UsersRepository } from 'src/repository/users.repository';

type Input = {
  name: string;
  email: string;
  password: string;
};

type CreateUserOutput = { id: string };

type GetUserByIdOutput = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  public async createUser(input: Input): Promise<CreateUserOutput> {
    const userExists = await this.userRepository.getUserByEmail(input.email);
    if (userExists) throw new ConflictException('Email already is use!');

    const passwordHash = await hash(input.password, await genSalt());
    const user = User.create({
      ...input,
      password: passwordHash,
    });
    await this.userRepository.createUser(user);

    return {
      id: user.id,
    };
  }

  public async getUserById(userId: string): Promise<GetUserByIdOutput> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) throw new NotFoundException('User not found!');

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
