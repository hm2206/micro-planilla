import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";
import { CreateTypeCargoDto } from "./create-type-cargo.dto";

export class UpdateTypeCargoDto extends CreateTypeCargoDto {
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  state!: boolean;
}