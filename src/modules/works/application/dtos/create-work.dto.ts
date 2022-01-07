import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateWorkDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  personId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  afpId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  affiliationOfDate: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  numberOfCussp: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isPrimaSeguro: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  numberOfEssalud: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  bankId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  numberOfAccount: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dateOfAdmission: Date;
}