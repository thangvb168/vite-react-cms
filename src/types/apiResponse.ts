export interface ApiResponse<T> {
  status?: 'success' | 'error';
  message?: string;
  code?: number;
  data: T | null;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  totalRecords: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
