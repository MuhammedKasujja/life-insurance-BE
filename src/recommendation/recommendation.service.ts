import { Injectable } from '@nestjs/common';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recommendation } from './entities/recommendation.entity';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectRepository(Recommendation)
    private recommendationRepo: Repository<Recommendation>,
  ) {}

  create(
    createRecommendationDto: CreateRecommendationDto,
  ): Promise<Recommendation> {
    const recommendation = new Recommendation();
    recommendation.age = createRecommendationDto.age;
    recommendation.income = createRecommendationDto.income;
    recommendation.riskTolerance = createRecommendationDto.riskTolerance;
    recommendation.numOfDependants = createRecommendationDto.numOfDependants;

    return this.recommendationRepo.save(recommendation);
  }

  findAll(): Promise<Recommendation[]> {
    return this.recommendationRepo.find();
  }

  findOne(id: number): Promise<Recommendation | null> {
    return this.recommendationRepo.findOneBy({ id });
  }

  update(id: number, updateRecommendationDto: UpdateRecommendationDto) {
    return `This action updates a #${id} recommendation`;
  }

  async remove(id: number): Promise<void> {
    await this.recommendationRepo.delete(id);
  }
}
