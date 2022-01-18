import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber } from "class-validator";
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
  @IsNumber()
  pimId: number;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  date: Date;

  @ApiProperty({ enum: PimLogModeEnum })
  @IsEnum(PimLogModeEnum)
  mode: PimLogModeEnum;
}