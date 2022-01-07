import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { ContractConditionEnum } from "../../domain/contract.enum";

export class CreateContractDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  workId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  dependencyId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  profileId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  typeCategoryId: number;

  @ApiProperty({ enum: ContractConditionEnum })
  @IsNotEmpty()
  @IsEnum(ContractConditionEnum)
  condition: ContractConditionEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  plaza: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  codeAIRSHP: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  codeAssistance: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  hourhandId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  resolution: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dateOfResolution: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dateOfAdmission: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  terminationDate: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  observation: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  hours: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  state: boolean;
}