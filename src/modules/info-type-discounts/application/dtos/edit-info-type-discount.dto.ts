import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class EditInfoTypeDiscountDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}