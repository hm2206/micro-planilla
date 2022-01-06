import { EntityRepository, Repository } from "typeorm";
import { ProfileEntity } from "./profile.entity";

@EntityRepository(ProfileEntity)
export class ProfileRepository extends Repository<ProfileEntity> {}