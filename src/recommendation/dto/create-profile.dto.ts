import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const CreateProfileSchema = extendApi(
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

export class CreateProfileDto extends createZodDto(
  CreateProfileSchema,
) {}

export const CreateProfileResponseZ = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.string(),
});

export class CreateProfileResponseDto extends createZodDto(
  CreateProfileResponseZ,
) {}
