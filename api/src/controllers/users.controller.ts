import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';

import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRequestDTO } from './dto/create-user-request.dto';
import { CreateUserResponseDTO } from './dto/create-user-response.dto';
import { GetUserByIdResponseDTO } from './dto/get-user-by-id-response.dto';
import { UsersService } from 'src/services/users.service';
import { AuthenticateRequest } from 'src/shared/types';
import { Public } from 'src/shared/public.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({
    description: 'User Created',
    type: CreateUserResponseDTO,
  })
  @Public()
  @Post()
  public async createUser(
    @Body() createUserRequestDTO: CreateUserRequestDTO,
  ): Promise<CreateUserResponseDTO> {
    return this.usersService.createUser(createUserRequestDTO);
  }

  @ApiOkResponse({
    description: 'User Found',
    type: GetUserByIdResponseDTO,
  })
  @Public()
  @Get(':userId')
  public async getUserById(
    @Param('userId') userId: string,
  ): Promise<GetUserByIdResponseDTO> {
    return this.usersService.getUserById(userId);
  }

  @ApiOkResponse({
    description: 'User Found',
    type: GetUserByIdResponseDTO,
  })
  @Get('me')
  public async me(
    @Req() request: AuthenticateRequest,
  ): Promise<GetUserByIdResponseDTO> {
    return this.usersService.getUserById(request.userId);
  }
}
