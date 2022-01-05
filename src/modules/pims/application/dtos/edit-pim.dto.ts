import { IsNotEmpty, IsNumberString, IsString, MaxLength } from "class-validator";

export interface IEditPimDto {
  code: string;
  money: number;
}

export class EditPimDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(4)
  code: string;

  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(12)
  money: number;
}