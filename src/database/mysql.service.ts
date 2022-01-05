import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { ConfigsEnum } from '../common/configs/configs.enum';
import { ConfigsModule } from '../common/configs/configs.module';
import { ConfigsService } from '../common/configs/configs.service';

export const mysqlService = TypeOrmModule.forRootAsync({
  imports: [ConfigsModule],
  inject: [ConfigsService],
  useFactory: (config: ConfigsService) => ({
    type: "mysql",
    host: config.get(ConfigsEnum.MYSQL_HOST),
    port: parseInt(config.get(ConfigsEnum.MYSQL_PORT)) as number,
    username: config.get(ConfigsEnum.MYSQL_USERNAME),
    password: config.get(ConfigsEnum.MYSQL_PASSWORD),
    database: config.get(ConfigsEnum.MYSQL_DBNAME),
    entities: [path.join(__dirname, '../modules/**/domain/*.entity{.ts,.js}')],
    logging: false,
    synchronize: true
  })
});
