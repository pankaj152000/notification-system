import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NotificationModule } from './notification/notification.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, NotificationModule],
  controllers: [AppController],
})
export class AppModule {}
