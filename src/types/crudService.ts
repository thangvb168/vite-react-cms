import { ApiResponse } from './apiResponse';
import { SearchParams } from './params';

export interface CRUDService<T> {
  getAll(params?: SearchParams): Promise<ApiResponse<T[]>>;
  getById(id: string | number): Promise<ApiResponse<T>>;
  create(data: Partial<T>): Promise<ApiResponse<T>>;
  update(id: string | number, data: Partial<T>): Promise<ApiResponse<T>>;
  delete(id: string | number): Promise<ApiResponse<null>>;
}
