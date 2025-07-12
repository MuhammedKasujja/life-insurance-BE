import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateRecommendationDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectRepository(Profile)
    private recommendationRepo: Repository<Profile>,
  ) {}

  create(
    createRecommendationDto: CreateProfileDto,
  ): Promise<Profile> {
    const recommendation = new Profile();
    recommendation.age = createRecommendationDto.age;
    recommendation.income = createRecommendationDto.income;
    recommendation.riskTolerance = createRecommendationDto.riskTolerance;
    recommendation.numOfDependants = createRecommendationDto.numOfDependants;

    return this.recommendationRepo.save(recommendation);
  }

  findAll(): Promise<Profile[]> {
    return this.recommendationRepo.find();
  }

  findOne(id: number): Promise<Profile | null> {
    return this.recommendationRepo.findOneBy({ id });
  }

  update(id: number, updateRecommendationDto: UpdateRecommendationDto) {
    return `This action updates a #${id} recommendation`;
  }

  async remove(id: number): Promise<void> {
    await this.recommendationRepo.delete(id);
  }
}
