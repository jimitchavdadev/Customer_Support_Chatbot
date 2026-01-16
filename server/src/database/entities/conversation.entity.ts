
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class ConversationLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sessionId: string;

  @Column()
  role: string; // 'user' or 'assistant'

  @Column('text')
  message: string;

  @CreateDateColumn()
  timestamp: Date;
}
