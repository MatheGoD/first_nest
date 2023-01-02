import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';

//decorator : class에 함수를 추가 할 수 있다.

@Module({
  imports: [],
  controllers: [MoviesController], //엔드포인트 설정 및 함수 실행
  providers: [],
})
export class AppModule {}
