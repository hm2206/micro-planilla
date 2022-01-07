import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
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

  @Put(':id')
  public update(@Param('id') id: number, @Body() editContractDto: EditContractDto) {
    return this.contractsService.editContract(id, editContractDto);
  }
}