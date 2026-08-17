import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { NotificationStatus } from './enum/notification.enum';
import {
  CreateNotificationRequestDto,
  CreateNotificationResponseDto,
} from './notification-dto/notification-dto';

@Controller('notification')
export class NotificationController {
  @Post('/create-notification')
  @HttpCode(HttpStatus.CREATED)
  createNotification(
    @Body() req: CreateNotificationRequestDto,
  ): CreateNotificationResponseDto {
    const response = new CreateNotificationResponseDto();
    try {
      response.status = HttpStatus.CREATED;
      response.message = `Notification created successfully : ${req.userId}`;
      response.notificationStatus = NotificationStatus.PROCESSING;
      return response;
    } catch {
      response.error = 'Crashed';
      response.message = 'Failed to create notification';
      response.status = HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
