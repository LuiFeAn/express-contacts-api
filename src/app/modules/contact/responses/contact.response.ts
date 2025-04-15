import { IBaseModel } from "../../../@shared/interfaces/base-model";

export interface ContactResponse extends IBaseModel {
  name: string;
  email?: string;
  phone: string;
}
