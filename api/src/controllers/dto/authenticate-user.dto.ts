import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthenticateUserRequestDTO {
  @ApiProperty({
    name: 'email',
    description: 'email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    name: 'password',
    description: 'password of the user',
  })
  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class AuthenticateUserResponseDTO {
  @ApiProperty({
    name: 'accessToken',
    description: 'JWT access token',
  })
  @IsString()
  accessToken: string;
}
