import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponseDTO {
  @ApiProperty({
    description: 'The id of the created user',
    example: 'c5a86897-496a-483d-9113-a1724893984d',
  })
  public id: string;
}
