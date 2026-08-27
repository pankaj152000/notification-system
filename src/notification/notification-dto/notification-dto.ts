import { IsEnum, IsObject, IsString } from 'class-validator';
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

  @IsObject()
  data: Record<string, unknown>;
}

export class CreateNotificationResponseDto extends BaseResponseDto {
  notificationStatus: NotificationStatus;
}

export class NotificationDetails {
  id: string;
  userid: string;
  channel: NotificationChannel;
  template: string;
  data: Record<string, unknown>;
  status: NotificationStatus;
  createdat: Date;
}
export class NotificationInfoResponseDto extends BaseResponseDto {
  notificationdata: NotificationDetails;
}
