
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  issue: string;

  @Column({ default: 'open' }) // open, resolved, escalated
  status: string;

  @Column({ default: 'medium' })
  priority: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.tickets)
  user: User;
}
