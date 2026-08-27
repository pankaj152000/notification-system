import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Param,
} from '@nestjs/common';
import {
  CreateNotificationRequestDto,
  CreateNotificationResponseDto,
  NotificationInfoResponseDto,
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

  @Get('/:id')
  getNotification(
    @Param('id') id: string,
  ): Promise<NotificationInfoResponseDto> {
    return this.notificationservice.getNotification(id);
  }
}
