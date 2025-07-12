import { createZodDto } from '@anatine/zod-nestjs';
import z from 'zod';

export const RecommendationResponseZ = z.object({
  title: z.string(),
  description: z.string(),
});

export class RecommendationResponseDto extends createZodDto(
  RecommendationResponseZ,
) {}

export interface RecommendationMLResult {
  title: string;
  description: string;
  confidence: number; // 0.0 to 1.0 confidence score
}
