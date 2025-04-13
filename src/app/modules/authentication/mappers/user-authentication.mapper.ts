import { User } from "../../user/model";
import { UserAuthenticationResponse } from "../responses/user-authentication.response";
export class UserAuthenticationMapper {
  static toResponse(user: User): UserAuthenticationResponse {
    return {
      id: user.id as number,
      name: user.name,
      email: user.email,
    };
  }
}
