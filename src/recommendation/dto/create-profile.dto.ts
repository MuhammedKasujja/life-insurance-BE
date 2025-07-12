import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { RiskTolerance } from '../entities/risk-tolerance.enum';

const riskToleranceValues = Object.values(RiskTolerance);

export const CreateProfileSchema = extendApi(
  z.object({
    age: z.coerce
      .number({ required_error: 'Age is required', message: 'Age is required' })
      .min(15, 'Only 15 and above are eligible')
      .max(90, 'Not eligible'),
    income: z.coerce
      .number({
        required_error: 'Monthly income is required',
        message: 'Monthly income is required',
      })
      .min(500)
      .max(1_000_000),
    numOfDependants: z.coerce
      .number()
      .max(10, 'Dependants must not exceed 10')
      .optional(),
    riskTolerance: z.enum(riskToleranceValues as [string, ...string[]], {
      required_error: 'Field is required',
      message: 'Field is required',
    }),
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
