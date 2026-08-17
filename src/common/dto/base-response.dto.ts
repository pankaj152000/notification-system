import { HttpStatus } from '@nestjs/common';

export class BaseResponseDto {
  status: HttpStatus;
  message: string;
  error: string;
}
