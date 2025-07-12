import { DataSource } from 'typeorm';
import { RecommendationRule } from '../../recommendation/entities/recommendation-rule.entity';
import { RiskTolerance } from '../../recommendation/entities/risk-tolerance.enum';
import { Logger } from "@nestjs/common";

export async function seedRecommendationRules(dataSource: DataSource) {
  const repo = dataSource.getRepository(RecommendationRule);

  const logger = new Logger('SeederData');

  const existing = await repo.count();
  if (existing > 0) {
    logger.log('Recommendation rules already exist, skipping seeding.')
    return;
  }

  const rules: Partial<RecommendationRule>[] = [
    {
      riskTolerance: RiskTolerance.HIGH,
      minAge: 0,
      maxAge: 39,
      product: 'Term Life Insurance',
      coverage: '$500,000',
      term: '20 years',
      description: 'Flexible and affordable coverage for a fixed term.',
    },
    {
      riskTolerance: RiskTolerance.HIGH,
      minAge: 40,
      maxAge: 120,
      product: 'Whole Life Insurance',
      coverage: '$900,000',
      term: 'lifetime',
      description: 'Lifetime coverage with a cash value component.',
    },
    {
      riskTolerance: RiskTolerance.MEDIUM,
      minAge: 0,
      maxAge: 49,
      product: 'Term Life with Riders',
      coverage: '$300,000',
      term: '15 years',
      description: 'Customizable term coverage with additional benefits.',
    },
    {
      riskTolerance: RiskTolerance.MEDIUM,
      minAge: 50,
      maxAge: 70,
      product: 'Universal Life Insurance',
      coverage: '$750,000',
      term: 'lifetime',
      description:
        'Flexible lifetime coverage with adjustable premiums and benefits.',
    },
    {
      riskTolerance: RiskTolerance.LOW,
      minAge: 0,
      maxAge: 25,
      product: 'Basic Term Life Insurance',
      coverage: '$250,000',
      term: '10 years',
      description: 'Simple and cost-effective term coverage.',
    },
  ];

  await repo.save(rules);
  logger.log('✅ Seeded recommendation rules')
}
