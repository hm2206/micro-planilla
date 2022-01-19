import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class EditInfoDto {
  @IsNotEmpty()
  @IsNumber()
  pimId: number;

  @IsNotEmpty()
  @IsNumber()
  bankId: number;  

  @IsOptional()
  @IsString()
  @MaxLength(30)
  numberOfAccount: string; 

  @IsNotEmpty()
  @IsBoolean()
  isCheck: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isEmail: boolean;
}