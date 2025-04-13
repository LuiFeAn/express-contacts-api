import { IBaseModel } from "../interfaces/base-model";

export class BaseModel implements IBaseModel {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({ id, createdAt, updatedAt }: IBaseModel) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
