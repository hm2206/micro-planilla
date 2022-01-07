import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesService } from './application/profiles.service';
import { ProfileRepository } from './domain/profile.repository';
import { ProfilesController } from './infrastructure/profiles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileRepository])],
  providers: [ProfilesService],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
