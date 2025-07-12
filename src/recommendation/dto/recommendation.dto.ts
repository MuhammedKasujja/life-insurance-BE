import { createZodDto } from '@anatine/zod-nestjs';
import z from 'zod';

export const RecommendationResponseZ = z.object({
  title: z.string(),
  description: z.string(),
});

export class RecommendationResponseDto extends createZodDto(
  RecommendationResponseZ,
) {}
