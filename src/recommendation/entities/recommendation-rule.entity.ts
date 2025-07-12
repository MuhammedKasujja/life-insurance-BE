import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { RiskTolerance } from './risk-tolerance.enum';

@Entity('recommendation_rules')
export class RecommendationRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RiskTolerance,
    enumName: 'risk_tolerance_enum',
    default:RiskTolerance.LOW,
  })
  riskTolerance: RiskTolerance;

  @Column()
  minAge: number;

  @Column()
  maxAge: number;

  @Column()
  product: string;

  @Column()
  coverage: string;

  @Column()
  term: string;

  @Column()
  description: string;
}
