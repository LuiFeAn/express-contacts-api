import { IListResourceRequest } from "../interfaces/list-resource.interface";
import { IResourceListResponse } from "../responses/resource-list.response";

export type QueryParamsType<T> = Partial<T>;

export interface IBaseRepository<T> {
  create?(data: T): Promise<T>;
  findAll?(query?: QueryParamsType<T>): Promise<T[]>;
  findAllPaginated?(
    query?: QueryParamsType<T>,
    pagination?: IListResourceRequest<T>
  ): Promise<IResourceListResponse<T>>;
  findById?(id: number): Promise<T | null>;
  update?(id: number, data: T): Promise<T | null>;
  delete?(id: number): Promise<boolean>;
}
