import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCronograma {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  public descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  public year: number;

  @IsNotEmpty()
  @IsNumber()
  public mes: number;

  @IsNotEmpty()
  @IsNumber()
  public dias: number;
  
  @IsNotEmpty()
  @IsBoolean()
  public adicional: boolean;

  @IsOptional()
  @MaxLength(255)
  public observacion: string;

  @IsNotEmpty()
  @IsNumber()
  public planillaId: number;

  @IsNotEmpty()
  @IsNumber()
  public entityId: number;

  @IsOptional()
  @IsBoolean()
  public remanente = false;
}

export class FilterTypeObject {
  @IsOptional()
  @IsNumber()
  public cargo_id?: number

  @IsOptional()
  @IsNumber()
  public type_categoria_id?: number

  @IsOptional()
  @IsNumber()
  public meta_id?: number
}