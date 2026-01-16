
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat/chat.gateway';
import { User } from './database/entities/user.entity';
import { Ticket } from './database/entities/ticket.entity';
import { ConversationLog } from './database/entities/conversation.entity';

@Module({
  imports: [
    // 1. Load .env
    ConfigModule.forRoot({ isGlobal: true }),

    // 2. Connect to Postgres
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get<string>('DB_USER', 'admin'),
        password: config.get<string>('DB_PASSWORD', 'root'),
        database: config.get<string>('DB_NAME', 'support_db'),
        entities: [User, Ticket, ConversationLog],
        synchronize: true, // ⚠️ Auto-create tables (Safe for Dev, dangerous for Prod)
      }),
      inject: [ConfigService],
    }),

    // 3. Register Entities
    TypeOrmModule.forFeature([User, Ticket, ConversationLog]),
  ],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
