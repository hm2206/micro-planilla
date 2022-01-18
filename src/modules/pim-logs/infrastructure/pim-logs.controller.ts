import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreatePimLogDto } from "../application/dtos/create-pim-log.dto";
import { PimLogsService } from "../application/pim-logs.service";

@Controller('pimLogs')
@ApiTags('pimLogs')
export class PimLogsController {
  constructor(private pimLogsService: PimLogsService) { }
  
  @Post()
  public store(@Body() createPinLogDto: CreatePimLogDto) {
    return this.pimLogsService.createPimLog({
      ...createPinLogDto,
      date: new Date,
      isDefault: false
    });
  }
}