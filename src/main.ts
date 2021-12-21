import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Seeder } from './database/seeder';
import { SENT_MAIL } from './microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // execption
  app.useGlobalFilters(new HttpExceptionFilter);
  
  // pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // cors
  app.enableCors({
    origin: '*',
    credentials: true,
  })

  // documentation
  const config = new DocumentBuilder()
    .setTitle('Planilla')
    .setDescription('Api de Planilla')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // add seeder
  const seeder = app.get(Seeder);
  await seeder.seed();

  const { HOST, PORT } = process.env;
  // host
  await app.listen(PORT, HOST, () => {
    console.log(`Server run: ${HOST}:${PORT}`);
  });

  // microservices
  app.connectMicroservice(SENT_MAIL);

  await app.startAllMicroservices();
}
bootstrap();
