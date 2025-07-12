import { RecommendationMLResult } from './dto/recommendation.dto';
import { Profile } from './entities/profile.entity';

export class MLRecommendationService {
  async predict(profile: Profile): Promise<RecommendationMLResult | null> {
    // TODO: (Muhammed) Replace with real ML call (external API microservice)

    // Simulate logic data for external API
    if (profile.riskTolerance === 'high' && profile.age < 40) {
     
      return {
        title: 'Term Life Insurance - $600,000 for 25 years',
        description:
          'Optimized ML-based coverage for high-risk young customers.',
        confidence: 0.92,
      };
    }

    // No confident prediction
    return null;
  }
}
