import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  ); // 유효성 검사 해줌
  app.use(morgan('dev'));
  await app.listen(3000);
}
bootstrap();

//whitelist가 뭐지? 없으면 안올거임
//이상한걸 보내면 리퀘스트 자체를 막는 것도 있음 forbid
//transform helps us to convert a request data into what we want
