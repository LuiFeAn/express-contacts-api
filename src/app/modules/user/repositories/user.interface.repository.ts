import { User } from "../model";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  emailExists(email: string): Promise<boolean>;
}
