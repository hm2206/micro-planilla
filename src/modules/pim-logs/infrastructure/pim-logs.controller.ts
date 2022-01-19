import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { CreatePimLogsService } from "../application/create-pim.logs.service";
import { CreatePimLogDto } from "../application/dtos/create-pim-log.dto";

@Controller('pimLogs')
@ApiTags('pimLogs')
export class PimLogsController {
  constructor(private createPimLogsService: CreatePimLogsService) { }
  
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public store(@Body() createPimLogDto: CreatePimLogDto,
    @UploadedFile() file: Express.Multer.File) {
    return this.createPimLogsService.createPimLog({
      ...createPimLogDto,
      date: new Date,
      isDefault: false
    }, file);
  }
}