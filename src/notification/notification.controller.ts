import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  CreateNotificationRequestDto,
  CreateNotificationResponseDto,
} from './notification-dto/notification-dto';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationservice: NotificationService) {}

  @Post('/create-notification')
  @HttpCode(HttpStatus.CREATED)
  createNotification(
    @Body() req: CreateNotificationRequestDto,
  ): CreateNotificationResponseDto {
    return this.notificationservice.createNotification(req);
  }
}
