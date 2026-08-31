import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import Redis from 'ioredis';
import { AppController } from './app.controller';
import { NotificationModule } from './notification/notification.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: () => ({
        connection: new Redis(process.env.REDIS_URL as string, {
          maxRetriesPerRequest: null,
        }),
      }),
    }),
    DatabaseModule,
    NotificationModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
