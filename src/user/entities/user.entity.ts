import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Academic } from './academic.entity';
import { Job } from './job.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Academic, (academic) => academic.user)
  academics: Academic[];

  @OneToMany(() => Job, (job) => job.user)
  jobs: Job[];
}
