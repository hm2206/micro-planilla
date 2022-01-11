import {
  IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCronogramaDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public year: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  public month: number;

  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(255)
  public observation?: string;
  
  @ApiProperty()
  @IsNotEmpty()
  public campusId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public planillaId: number;
}

export class CreateCronogramaWithAdicionalDto extends CreateCronogramaDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  public adicional: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  public remanente: boolean;
}