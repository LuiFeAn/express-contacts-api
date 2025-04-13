import { User } from "../model";

export interface IUserRepository {
  create(user: User): Promise<User>;
  emailExists(email: string): Promise<boolean>;
}
