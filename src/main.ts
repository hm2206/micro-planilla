import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ 
    origin: '*',
    credentials: true, 
  });

  const host = process.env.HOST;
  const port = process.env.PORT;

  app.useGlobalFilters(new HttpExceptionFilter);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  await app.listen(port, host, () => {
    console.log(`Server run: ${host}:${port}`);
  });
}
bootstrap();
