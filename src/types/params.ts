import { AnyRecord } from './utils';

export interface SearchParams extends AnyRecord {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
}
