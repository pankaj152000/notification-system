import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateNotificationResponseDto,
  CreateNotificationRequestDto,
  NotificationByIdResponseDto,
  GetNotificationsQueryDto,
  NotificationListResponseDto,
} from './notification-dto/notification-dto';
import {
  NotificationStatus,
  NotificationChannel,
} from './enum/notification.enum';
import { NotificationRepository } from './notification.repository';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async createNotification(
    req: CreateNotificationRequestDto,
  ): Promise<CreateNotificationResponseDto> {
    const response = new CreateNotificationResponseDto();
    try {
      await this.notificationRepository.create({
        user_id: req.userId,
        channel: NotificationChannel[req.channel],
        template: req.template,
        data: req.data as Prisma.InputJsonValue,
      });

      response.status = 'success';
      response.message = `Notification created successfully : ${req.userId}`;
      response.notificationStatus = NotificationStatus.pending;
      return response;
    } catch (error: unknown) {
      response.error = error instanceof Error ? error.message : String(error);
      response.message = 'Failed to create notification';
      response.status = 'error';
      throw new HttpException(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getNotification(id: string): Promise<NotificationByIdResponseDto> {
    const response = new NotificationByIdResponseDto();
    try {
      const notification = await this.notificationRepository.findUnique({
        where: { id },
      });

      if (!notification) {
        throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
      }
      response.notificationdata = {
        id: notification.id,
        userid: notification.user_id,
        channel: notification.channel as NotificationChannel,
        template: notification.template,
        data: notification.data as Record<string, unknown>,
        status: notification.status as NotificationStatus,
        createdat: notification.created_at,
      };

      response.status = 'success';
      response.message = 'Notification fetched successfully';
      return response;
    } catch (error: unknown) {
      response.error = error instanceof Error ? error.message : String(error);
      response.message = 'Failed to fetch notification';
      response.status = 'error';
      throw new HttpException(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getNotifications(
    query: GetNotificationsQueryDto,
  ): Promise<NotificationListResponseDto> {
    const response = new NotificationListResponseDto();
    try {
      const { page, limit, status, channel, userId } = query;

      const where: Prisma.notificationsWhereInput = {
        user_id: userId,
        channel,
        status,
      };

      const [notifications, total] = await Promise.all([
        this.notificationRepository.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { created_at: 'desc' },
        }),
        this.notificationRepository.count({ where }),
      ]);

      response.data = {
        notifications: notifications.map((notification) => ({
          id: notification.id,
          userId: notification.user_id,
          channel: notification.channel as NotificationChannel,
          template: notification.template,
          status: notification.status as NotificationStatus,
          createdAt: notification.created_at,
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };

      response.status = 'success';
      response.message = 'Notifications fetched successfully';
      return response;
    } catch (error: unknown) {
      response.error = error instanceof Error ? error.message : String(error);
      response.message = 'Failed to fetch notifications';
      response.status = 'error';
      throw new HttpException(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
