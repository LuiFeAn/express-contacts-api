import { IBaseModel } from "../../../@shared/interfaces/base-model";

export interface IUser extends IBaseModel {
  name: string;
  email: string;
  password: string;
}
