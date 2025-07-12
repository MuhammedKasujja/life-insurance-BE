import { Module } from '@nestjs/common';
import { RecommendationModule } from './recommendation/recommendation.module';
import { DatabaseModule } from './config/database.config';

@Module({
  imports: [DatabaseModule, RecommendationModule],
})
export class AppModule {}
