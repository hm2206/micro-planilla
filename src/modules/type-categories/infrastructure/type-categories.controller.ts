import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { TypeCategoriesService } from "../application/type-categories.service";

@Controller('typeCategories')
@ApiTags('typeCategories')
export class TypeCategoriesController {
  constructor(private typeCategoriesService: TypeCategoriesService) { }
  
  @Get()
  public index(@Query() paginate: PaginateDto) {
    return this.typeCategoriesService.getTypeCategories(paginate);
  }
}