import { Injectable } from "@nestjs/common";
import { PaginateDto } from "../../../common/dto/paginate.dto";
import { ProfileRepository } from "../domain/profile.repository";

@Injectable()
export class ProfilesService {
  constructor(private profileRepository: ProfileRepository) { }
  
  public getProfiles(paginate: PaginateDto) {
    const queryBuilder = this.profileRepository.createQueryBuilder('p');
    return this.profileRepository.paginate(queryBuilder, paginate);
  }
}