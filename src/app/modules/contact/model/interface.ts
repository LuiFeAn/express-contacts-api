import { IBaseModel } from "../../../@shared/interfaces/base-model";

export interface IContact extends IBaseModel {
  name: string;
  email?: string;
  phone: string;
  userId: number;
}
