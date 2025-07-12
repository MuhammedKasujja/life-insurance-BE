import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { RiskTolerance } from '../entities/risk-tolerance.enum';

const riskToleranceValues = Object.values(RiskTolerance);

export const CreateProfileSchema = extendApi(
  z.object({
    age: z.coerce.number().min(15).max(90),
    income: z.coerce.number().min(500).max(1_000_000),
    numOfDependants: z.coerce.number().max(10, 'Dependants must not exceed 10'),
    riskTolerance: z.enum(riskToleranceValues as [string, ...string[]]),
  }),
  {
    title: 'Recommendation',
    description: 'Recommendation created',
  },
);

export class CreateProfileDto extends createZodDto(CreateProfileSchema) {}

export const CreateProfileResponseZ = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.string(),
});

export class CreateProfileResponseDto extends createZodDto(
  CreateProfileResponseZ,
) {}
