//job.entity.ts


import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company: string;

  @Column()
  designation: string;

  @Column()
  experience_years: number;

  @ManyToOne(() => User, (user) => user.jobs)
  user: User;
}
