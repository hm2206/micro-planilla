import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class CreateInfoTypeRemunerationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  infoId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  typeRemunerationId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isBase: boolean;
}