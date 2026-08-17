import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  project(): { message: string } {
    return {
      message: 'This is a notification system',
    };
  }

  @Get('health')
  getHealth(): { status: string } {
    return {
      status: 'ok',
    };
  }
}
