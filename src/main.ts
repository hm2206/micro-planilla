import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ 
    origin: '*',
    credentials: true, 
  });
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT);
}
bootstrap();
