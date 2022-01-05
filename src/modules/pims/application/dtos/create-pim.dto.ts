import { IsNotEmpty, IsNumber, IsNumberString, IsString, Length, MaxLength } from "class-validator";

export interface ICreatePimDto {
  code: string;
  metaId: number;
  cargoId: number;
  year: number;
  money: number;
}

export class CreatePimDto implements ICreatePimDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(4)
  code: string;

  @IsNotEmpty()
  @IsNumber()
  metaId: number;

  @IsNotEmpty()
  @IsNumber()
  cargoId: number;

  @IsNotEmpty()
  @IsNumberString()
  @Length(4)
  year: number;

  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(12)
  money: number;
}