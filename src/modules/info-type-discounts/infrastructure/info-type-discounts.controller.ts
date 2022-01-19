import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateInfoTypeDiscountDto } from "../application/dtos/create-info-type-discount.dto";
import { InfoTypeDiscountsService } from "../application/info-type-discounts.service";

@Controller('infoTypeDiscounts')
@ApiTags('infoTypeDiscounts')
export class InfoTypeDiscountsController {
  constructor(private infoTypeDiscountsService: InfoTypeDiscountsService) { }
  
  @Post()
  public store(@Body() payload: CreateInfoTypeDiscountDto) {
    return this.infoTypeDiscountsService.createInfoTypeDiscount(payload);
  }

  @Put(':id')
  public update(@Param('id') id: number, @Body() payload) {
    return this.infoTypeDiscountsService.editInfoTypeDiscount(id, payload);
  }

  @Delete(':id')
  public delete(@Param('id') id: number) {
    return this.infoTypeDiscountsService.deleteInfoTypeDiscount(id);
  }
}