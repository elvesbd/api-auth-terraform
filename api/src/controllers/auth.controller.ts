import { Body, Controller, Post } from '@nestjs/common';
import {
  AuthenticateUserRequestDTO,
  AuthenticateUserResponseDTO,
} from './dto/authenticate-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/services/auth.service';
import { Public } from 'src/shared/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: 'Token Created',
    type: AuthenticateUserResponseDTO,
  })
  @Public()
  @Post('login')
  public async login(
    @Body() credentials: AuthenticateUserRequestDTO,
  ): Promise<any> {
    return this.authService.login(credentials);
  }
}
