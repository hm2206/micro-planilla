import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateHistorialDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  pimId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  days: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  bankId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(30)
  numberOfAccount: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isCheck: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isPay: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observation: string;
}