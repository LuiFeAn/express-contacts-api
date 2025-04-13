
import { BaseModel } from "../../../@shared/classes/base-model";
import { IUser } from "./interface";
import bcrypt from "bcrypt";

export class User extends BaseModel {
  private _name: string;
  private _email: string;
  private _password: string;

  constructor({ name, email, password, id, createdAt, updatedAt }: IUser) {
    super({ id, createdAt, updatedAt });
    this._name = name;
    this._email = email;
    this._password = password;
  }

  hashPassword() {
    this._password = bcrypt.hashSync(this._password, 10);
  }

  comparePassword(password: string) {
    return bcrypt.compareSync(password, this._password);
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  set name(name: string) {
    this._name = name;
  }
}
