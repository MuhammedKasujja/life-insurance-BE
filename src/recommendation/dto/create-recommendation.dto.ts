import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const CreateRecommendationSchema = extendApi(
  z.object({
    age: z.number(),
    income: z.number(),
    numOfDependants: z.number(),
    riskTolerance: z.enum(['low', 'medium', 'high']),
  }),
  {
    title: 'Recommendation',
    description: 'Recommendation created',
  },
);

export class CreateRecommendationDto extends createZodDto(
  CreateRecommendationSchema,
) {}

export const CreateRecommendationResponseZ = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.string(),
});

export class CreateRecommendationResponseDto extends createZodDto(
  CreateRecommendationResponseZ,
) {}
