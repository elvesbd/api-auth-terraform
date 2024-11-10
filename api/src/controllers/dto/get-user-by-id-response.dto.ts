import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class GetUserByIdResponseDTO {
  @ApiProperty({
    description: 'The user id',
    example: 'c5a86897-496a-483d-9113-a1724893984d',
  })
  public id: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  public name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'johndoe@mail.com',
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: 'The date of the create user',
    example: '12345678',
  })
  public createdAt: Date;

  @ApiProperty({
    description: 'The date of the update user',
    example: '12345678',
  })
  public updatedAt: Date;
}
