import { User } from "../model";
import { IUser } from "../model/interface";

export class UserMapper {
  public static sqliteToDomain(user: IUser): User {
    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
