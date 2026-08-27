import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import {
  CreateNotificationRequestDto,
  CreateNotificationResponseDto,
  NotificationByIdResponseDto,
  GetNotificationsQueryDto,
  NotificationListResponseDto,
} from './notification-dto/notification-dto';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationservice: NotificationService) {}

  @Post('/create-notification')
  @HttpCode(HttpStatus.CREATED)
  createNotification(
    @Body() req: CreateNotificationRequestDto,
  ): Promise<CreateNotificationResponseDto> {
    return this.notificationservice.createNotification(req);
  }

  @Get()
  getNotifications(
    @Query() query: GetNotificationsQueryDto,
  ): Promise<NotificationListResponseDto> {
    return this.notificationservice.getNotifications(query);
  }

  @Get('/:id')
  getNotification(
    @Param('id') id: string,
  ): Promise<NotificationByIdResponseDto> {
    return this.notificationservice.getNotification(id);
  }
}
