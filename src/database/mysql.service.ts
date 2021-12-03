import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

export const mysqlService = TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT) as number,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [path.join(__dirname, '../modules/**/domain/*.entity{.ts,.js}')],
    logging: false
  }),
});
