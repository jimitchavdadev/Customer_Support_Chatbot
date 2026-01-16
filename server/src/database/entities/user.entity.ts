
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', default: 0 })
  accountBalance: number;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];
}
