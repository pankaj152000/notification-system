export class BaseResponseDto {
  status: string;
  message: string;
  error: string;
}

export class PaginationDto {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
