import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateInfoTypeDiscountDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  infoId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  typeDiscountId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}