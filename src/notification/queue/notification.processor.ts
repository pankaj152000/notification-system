import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NotificationService } from '../notification.service';

@Processor('notifications')
export class NotificationProcessor extends WorkerHost {
  constructor(private readonly notificationService: NotificationService) {
    super();
  }

  async process(job: Job): Promise<void> {
    await this.notificationService.processNotification(job.data.notificationId);
  }
}
