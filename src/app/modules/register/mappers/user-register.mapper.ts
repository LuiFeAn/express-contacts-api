import { User } from "../../user/model";
import { IUserRegisterResponse } from "../responses/user-register.response";

export class UserRegisterMapper {
  static toRequest(user: User): IUserRegisterResponse {
    return {
      name: user.name,
      email: user.email,
    };
  }
}
