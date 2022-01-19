import { Module } from '@nestjs/common'
import {
  StorageModule,
  DriverType
} from '@codebrew/nestjs-storage';
import { resolve } from 'path';
import { StoragesService } from './storages.service';

@Module({
  imports: [
    StorageModule.forRoot({
      default: 'local',
      disks: {
        local: {
          driver: DriverType.LOCAL,
          config: {
            root: resolve(__dirname, `../../../storage`)
          }
        }
      }
    })
  ],
  providers: [StoragesService],
  exports: [StoragesService],
})
export class StoragesModule {}