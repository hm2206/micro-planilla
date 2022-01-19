import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBooleanString, IsOptional } from 'class-validator';
import { PaginateDto } from '../../../../common/dto/paginate.dto';

export class GetPlanillasDto extends PaginateDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBooleanString()
  principal: boolean;
}