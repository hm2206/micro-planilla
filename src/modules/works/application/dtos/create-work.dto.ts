import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateWorkDto {
  @IsNotEmpty()
  @IsNumber()
  personId: number;

  @IsNotEmpty()
  @IsNumber()
  afpId: number;

  @IsOptional()
  @IsDateString()
  affiliationOfDate: Date;

  @IsOptional()
  @IsString()
  numberOfCussp: string;

  @IsNotEmpty()
  @IsBoolean()
  isPrimaSeguro: boolean;

  @IsOptional()
  @IsString()
  numberOfEssalud: string;

  @IsNotEmpty()
  @IsNumber()
  bankId: number;

  @IsOptional()
  @IsString()
  numberOfAccount: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfAdmission: Date;
}