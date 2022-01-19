import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginateDto } from "../../../common/dto/paginate.dto";
import { TypeDiscountsService } from "../application/type-discounts.service";

@Controller('typeDiscounts')
@ApiTags('TypeDiscounts')
export class TypeDiscountsController {
  constructor(private typeDiscountsService: TypeDiscountsService) { }
  
  @Get()
  public index(@Query() paginate: PaginateDto) {
    return this.typeDiscountsService.getDiscounts(paginate);
  }
}