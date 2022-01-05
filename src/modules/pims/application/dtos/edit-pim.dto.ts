import { IsBoolean, IsNotEmpty, IsNumberString, IsString, MaxLength } from "class-validator";

export interface IEditPimDto {
  code: string;
  money: number;
  state: boolean;
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

  @IsNotEmpty()
  @IsBoolean()
  public state: boolean;
}