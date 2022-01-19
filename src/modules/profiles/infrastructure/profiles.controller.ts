import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { ProfilesService } from "../application/profiles.service";

@Controller('profiles')
@ApiTags('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) { }
  
  @Get()
  public index(@Query() paginate: PaginateDto) {
    return this.profilesService.getProfiles(paginate);
  }
}