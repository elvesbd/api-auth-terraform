import { Module } from '@nestjs/common';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { AuthController } from './controllers/auth.controller';
import { UsersRepository } from './repository/users.repository';
import { UsersController } from './controllers/users.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './shared/guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ global: true }),
  ],
  controllers: [UsersController, AuthController],
  providers: [
    UsersService,
    AuthService,
    UsersRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
