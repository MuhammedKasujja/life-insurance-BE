import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seedRecommendationRules } from './database/seeders';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);

  await seedRecommendationRules(dataSource);
  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);
  const config = new DocumentBuilder()
    .setTitle('Insurance App API')
    .setDescription('The Insurance API description')
    .setVersion('1.0')
    .build();
  patchNestjsSwagger(); // <--- This is the hacky patch using prototypes (for now)
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);
  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/${globalPrefix}`);
  });
}
bootstrap();
