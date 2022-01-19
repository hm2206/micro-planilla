import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class EditInfoTypeRemunerationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isBase: boolean;
}