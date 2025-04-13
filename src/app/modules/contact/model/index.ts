import { BaseModel } from "../../../@shared/classes/base-model";
import { IContact } from "./interface";

export class Contact extends BaseModel {
  private _name: string;
  private _email?: string;
  private _phone: string;
  private _userId: number;

  constructor({
    name,
    email,
    phone,
    userId,
    id,
    createdAt,
    updatedAt,
  }: IContact) {
    super({ id, createdAt, updatedAt });
    this._name = name;
    this._email = email;
    this._phone = phone;
    this._userId = userId;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get phone() {
    return this._phone;
  }

  get userId() {
    return this._userId;
  }
}
