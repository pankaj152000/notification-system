import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateNotificationResponseDto,
  CreateNotificationRequestDto,
} from './notification-dto/notification-dto';
import { NotificationStatus } from './enum/notification.enum';

@Injectable()
export class NotificationService {
  createNotification(
    req: CreateNotificationRequestDto,
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
