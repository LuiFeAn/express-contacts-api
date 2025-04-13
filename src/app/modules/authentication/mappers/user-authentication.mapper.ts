import { User } from "../../user/model";

export class UserAuthenticationMapper {
  static toRequest(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
