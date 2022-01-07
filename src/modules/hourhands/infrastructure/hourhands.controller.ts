import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginateDto } from "../../../common/dto/paginate.dto";
import { HourhandsService } from "../application/hourhands.service";

@Controller('hourhands')
@ApiTags('hourhands')
export class HourhandsController {
  constructor(private hourhandsService: HourhandsService) { }
  
  @Get()
  public index(@Query() paginate: PaginateDto) {
    return this.hourhandsService.getHourhands(paginate);
  }
}