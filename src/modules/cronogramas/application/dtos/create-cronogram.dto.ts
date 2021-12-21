import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCronogramaDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public year: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ allowNaN: true, maxDecimalPlaces: 0 })
  public mes: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public dias: number;

  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  public observacion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public planillaId: number;

  @ApiProperty()
  @IsNotEmpty()
  public entityId: number;
}

export class CreateCronogramaWithAdicionalDto extends PartialType(CreateCronogramaDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public adicional: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  public remanente: boolean;
}