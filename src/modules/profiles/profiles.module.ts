import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileRepository } from './domain/profile.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileRepository])],
})
export class ProfilesModule {}
