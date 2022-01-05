import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ContractsService } from "../application/contracts.service";
import { CreateContractDto } from "../application/dtos/create-contract.dto";

@Controller('contracts')
@ApiTags('contracts')
export class ContractsController {
  constructor(private contractsService: ContractsService) {}

  @Post()
  public store(@Body() createContractDto: CreateContractDto) {
    return this.contractsService.createContract(createContractDto);
  }
}