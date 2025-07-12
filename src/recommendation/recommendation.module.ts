import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { RecommendationRule } from './entities/recommendation-rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, RecommendationRule])],
  controllers: [RecommendationController],
  providers: [RecommendationService],
})
export class RecommendationModule {}
