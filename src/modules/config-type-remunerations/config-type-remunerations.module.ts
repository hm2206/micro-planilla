import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigTypeRemunerationRepository } from './domain/config-type-remuneration.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigTypeRemunerationRepository])],
})
export class ConfigTypeRemunerationsModule {}
