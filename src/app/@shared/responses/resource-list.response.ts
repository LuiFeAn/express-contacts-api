export interface IResourceListResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
  }