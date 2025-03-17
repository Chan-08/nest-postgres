//acadamic.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Academic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  degree: string;

  @Column()
  university: string;

  @Column()
  year_of_passing: number;

  @ManyToOne(() => User, (user) => user.academics)
  user: User;
}
