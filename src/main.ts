import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Community API')
    .setDescription('커뮤니티 게시판 서비스 API 문서입니다.')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth','인증 관련 API')
    .addTag('Board','게시판 관련 API')
    .setContact('담당자','https://github.com/chanseop/community-service/','dlackstjq23@naver.com')
    .addServer('http://localhost:3000','develop')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
