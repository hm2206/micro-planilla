import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { BanksService } from "../application/banks.service";

@Controller('banks')
@ApiTags('banks')
export class BanksController {
  constructor(private banksService: BanksService) {}

  @Get()
  public index(@Query() paginate: PaginateDto) {
    return this.banksService.getBanks(paginate);
  }
}