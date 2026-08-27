import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.notificationsCreateInput) {
    return this.prisma.notifications.create({ data });
  }

  findUnique(args: Prisma.notificationsFindUniqueArgs) {
    return this.prisma.notifications.findUnique(args);
  }

  findMany(args: Prisma.notificationsFindManyArgs) {
    return this.prisma.notifications.findMany(args);
  }

  count(args: Prisma.notificationsCountArgs) {
    return this.prisma.notifications.count(args);
  }
}
