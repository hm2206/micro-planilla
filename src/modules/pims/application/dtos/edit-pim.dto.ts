import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export interface IEditPimDto {
  code: string;
  amount: number;
  state: boolean;
}

export class EditPimDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(4)
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  state: boolean;
}