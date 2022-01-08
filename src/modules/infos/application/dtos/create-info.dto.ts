import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateInfoDto {
  @IsNotEmpty()
  @IsNumber()
  contractId: number;

  @IsNotEmpty()
  @IsNumber()
  planillaId: number;

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
  isSync: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isEmail: boolean;
}