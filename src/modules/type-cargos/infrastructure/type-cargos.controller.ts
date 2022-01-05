import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateTypeCargoDto } from "../application/dtos/create-type-cargo.dto";
import { UpdateTypeCargoDto } from "../application/dtos/update-type-cargo.dto";
import { TypeCargosService } from "../application/type-cargos.service";

@Controller("type_cargos")
export class TypeCargosController {
  constructor(private typeCargosService: TypeCargosService){}

  @Get()
  public index() {
    return this.typeCargosService.getTypeCargos();
  }

  @Post()
  public store(@Body() createTypeCargoDto: CreateTypeCargoDto){
    return this.typeCargosService.createTypeCargo(createTypeCargoDto);
  }

  @Get(":id")
  public show(@Param("id") id: number){
    return this.typeCargosService.findTypeCargo(id);
  }

  @Put(":id")
  public update(@Param("id") id: number, @Body() updateTypeCargoDto: UpdateTypeCargoDto){
    return this.typeCargosService.updateTypeCargo(id, updateTypeCargoDto);
  }

  @Delete(":id")
  public delete(@Param("id") id: number){
    return this.typeCargosService.deleteTypeCargo(id);
  }
}