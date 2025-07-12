import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RiskTolerance } from './risk-tolerance.enum';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  age: number;

  @Column()
  income: number;

  @Column()
  numOfDependants: number;

  @Column({
    type: 'enum',
    enum: RiskTolerance,
    enumName: 'profile_risk_tolerance_enum',
    default: RiskTolerance.LOW,
  })
  riskTolerance: RiskTolerance;

  @CreateDateColumn()
  createdAt: Date; // Creation date

  @UpdateDateColumn()
  updatedAt: Date; // Last updated date
}
