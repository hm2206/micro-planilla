import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateInfoTypeAportationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  infoId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  typeAportationId: number;
}