import { IsEnum, IsString } from 'class-validator';
import { BaseResponseDto } from '../../common/dto/base-response.dto';
import {
  NotificationChannel,
  NotificationStatus,
} from '../enum/notification.enum';

export class CreateNotificationRequestDto {
  @IsString()
  userId: string;

  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @IsString()
  template: string;
}

export class CreateNotificationResponseDto extends BaseResponseDto {
  notificationStatus: NotificationStatus;
}
