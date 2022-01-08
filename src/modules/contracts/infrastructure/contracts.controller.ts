import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { ContractsService } from "../application/contracts.service";
import { CreateContractDto } from "../application/dtos/create-contract.dto";
import { EditContractDto } from "../application/dtos/edit-contract.dto";

@Controller('contracts')
@ApiTags('contracts')
export class ContractsController {
  constructor(private contractsService: ContractsService) {}

  @Post()
  public store(@Body() createContractDto: CreateContractDto) {
    return this.contractsService.createContract(createContractDto);
  }

  @Get(':id')
  public show(@Param('id') id: number) {
    return this.contractsService.findContract(id);
  }

  @Put(':id')
  public update(@Param('id') id: number, @Body() editContractDto: EditContractDto) {
    return this.contractsService.editContract(id, editContractDto);
  }

  @Get(':id/infos')
  public infos(@Param('id') id: number, @Query() paginate: PaginateDto) {
    return this.contractsService.findInfos(id, paginate);
  }
}