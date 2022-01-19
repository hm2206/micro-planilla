import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumberString, IsOptional, IsString, MaxLength } from "class-validator";
import { PimLogModeEnum } from "../../domain/pim-log.enum";

export interface ICreatePimLogDto {
  pimId: number;
  amount: number;
  date: Date;
  mode?: PimLogModeEnum;
  observation?: string;
  isDefault?: boolean;
}

export class CreatePimLogDto implements ICreatePimLogDto {
  @ApiProperty()
  @IsNumberString()
  pimId: number;

  @ApiProperty()
  @IsNumberString({ maxDecimalPlaces: 2 })
  amount: number;

  date: Date;

  @ApiProperty({ enum: PimLogModeEnum })
  @IsEnum(PimLogModeEnum)
  mode: PimLogModeEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  observation?: string;
}