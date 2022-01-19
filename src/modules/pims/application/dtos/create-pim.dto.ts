import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export interface ICreatePimDto {
  code: string;
  metaId: number;
  cargoId: number;
  year: number;
  amount: number;
}

export class CreatePimDto implements ICreatePimDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(4)
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  metaId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cargoId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  year: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;
}