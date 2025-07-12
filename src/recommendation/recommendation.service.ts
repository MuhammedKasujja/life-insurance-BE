import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { RecommendationResponseDto } from './dto/recommendation.dto';
import { parseBool } from 'src/config/utils';
import { RecommendationRule } from './entities/recommendation-rule.entity';
import { RiskTolerance } from './entities/risk-tolerance.enum';
import { MLRecommendationService } from './ml.recommendation.service';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectRepository(Profile)
    private profileRepo: Repository<Profile>,
    @InjectRepository(RecommendationRule)
    private readonly ruleRepo: Repository<RecommendationRule>,
    private readonly mlService: MLRecommendationService,
  ) {}

  create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = new Profile();
    profile.age = createProfileDto.age;
    profile.income = createProfileDto.income;
    profile.riskTolerance = createProfileDto.riskTolerance as RiskTolerance;
    profile.numOfDependants = createProfileDto.numOfDependants;

    return this.profileRepo.save(profile);
  }

  findAll(): Promise<Profile[]> {
    return this.profileRepo.find();
  }

  findOne(id: number): Promise<Profile | null> {
    return this.profileRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.profileRepo.delete(id);
  }

  async getRecommendation(
    profile: Profile,
  ): Promise<RecommendationResponseDto> {
    if (parseBool(process.env.USE_ML_PREDICTION)) {
      const mlResult = await this.mlService.predict(profile);
      if (
        mlResult &&
        mlResult.confidence >
          parseInt(process.env.ML_MINIMUM_CONFIDENCE_LEVEL ?? '1')
      ) {
        return {
          title: mlResult.title,
          description: mlResult.description,
        };
      }
    }

    return this.generateRulesBasedRecommendation(profile);
  }

  // Return recommendations basing on profile data
  private async generateRulesBasedRecommendation(
    profile: Profile,
  ): Promise<RecommendationResponseDto> {
    const { age, riskTolerance } = profile;

    // get from stored business recommendation rules
    const rule = await this.ruleRepo.findOne({
      where: {
        riskTolerance,
        minAge: LessThanOrEqual(age),
        maxAge: MoreThanOrEqual(age),
      },
    });

    // fallback rule incase nothing is returned from rules
    if (!rule) {
      return {
        title: 'Basic Term Life Insurance - $250,000 for 10 years',
        description: 'Simple and cost-effective term coverage.',
      };
    }

    const title = `${rule.product} - ${rule.coverage} for ${rule.term}`;
    return { title, description: rule.description };
  }
}
