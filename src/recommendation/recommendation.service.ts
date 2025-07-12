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

  create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = new Profile();
    profile.age = createProfileDto.age;
    profile.income = createProfileDto.income;
    profile.riskTolerance = createProfileDto.riskTolerance;
    profile.numOfDependants = createProfileDto.numOfDependants;

    return this.recommendationRepo.save(profile);
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

  getRecommendation(profile: Profile): Promise<string> {
    if (process.env.USE_ML_PREDICTION) {
      return this.generateMLBasedRecommendation(profile);
    }

    return this.generateRulesBasedRecommendation(profile);
  }

  // Return recommendations basing on profile data
  private async generateRulesBasedRecommendation(
    profile: Profile,
  ): Promise<string> {
    const { age, riskTolerance } = profile;

    if (riskTolerance === 'high') {
      return age < 40 ? 'Term Life Insurance' : 'Whole Life Insurance';
    }

    if (riskTolerance === 'medium') {
      return age < 50 ? 'Term Life with Riders' : 'Universal Life Insurance';
    }

    return 'Basic Term Life Insurance';
  }

  // TODO: (Muhammed) Return recommendations based on Machine learning data
  private async generateMLBasedRecommendation(
    profile: Profile,
  ): Promise<string> {
    return 'Prediction using Machine learning';
  }
}
