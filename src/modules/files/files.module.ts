import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from './domain/file.repository';
import { FilesController } from './infrastructure/files.controller';
import { FilesService } from './application/files.service';
import { StoragesModule } from '../../common/storages/storages.module';

@Module({
  imports: [
    StoragesModule,
    TypeOrmModule.forFeature([FileRepository])
  ],
  providers: [FilesService],
  controllers: [FilesController],
  exports: [FilesService],
})
export class FilesModule {}
