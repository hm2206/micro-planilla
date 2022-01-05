import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeCargoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name!: string;
}