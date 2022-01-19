import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { AfpsService } from "../application/afps.service";

@Controller('afps')
@ApiTags('afps')
export class AfpsController {
  constructor(private afpsService: AfpsService) { }
  
  @Get()
  public index(@Query() paginate: PaginateDto) {
    return this.afpsService.getAfps(paginate);
  }
}