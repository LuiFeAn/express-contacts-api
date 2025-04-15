import { IBaseModel } from "../interfaces/base-model";

export class BaseModel implements IBaseModel {
  private _id: number | undefined;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor({ id, createdAt, updatedAt }: IBaseModel) {
    this._id = id;
    this._createdAt = createdAt ?? new Date();
    this._updatedAt = updatedAt ?? new Date();
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }
}
