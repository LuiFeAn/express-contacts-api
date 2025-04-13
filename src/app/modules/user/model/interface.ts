import { IBaseModel } from "../../../@shared/interfaces/base-model";
import { Contact } from "../../contact/model";

export interface IUser extends IBaseModel {
  name: string;
  email: string;
  password: string;
  contacts: Contact[];
}
