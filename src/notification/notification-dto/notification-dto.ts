import {
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  BaseResponseDto,
  PaginationDto,
} from '../../common/dto/base-response.dto';
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
export class NotificationByIdResponseDto extends BaseResponseDto {
  notificationdata: NotificationDetails;
}

export class GetNotificationsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @IsOptional()
  @IsEnum(NotificationStatus)
  status?: NotificationStatus;

  @IsOptional()
  @IsEnum(NotificationChannel)
  channel?: NotificationChannel;

  @IsOptional()
  @IsString()
  userId?: string;
}

export class NotificationSummaryDto {
  id: string;
  userId: string;
  channel: NotificationChannel;
  template: string;
  status: NotificationStatus;
  createdAt: Date;
}

class NotificationListData {
  notifications: NotificationSummaryDto[];
  pagination: PaginationDto;
}
export class NotificationListResponseDto extends BaseResponseDto {
  data: NotificationListData;
}
