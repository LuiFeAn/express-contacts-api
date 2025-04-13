import { Database } from "sqlite3";
import { IUserRepository } from "./user.interface.repository";
import { User } from "../model";
import sqlite from "../../../@shared/database/sqlite";

export class UserSqliteRepository implements IUserRepository {
  constructor(private readonly db: Database) {}

  async create(user: User): Promise<User> {
    const stmt = this.db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    stmt.run(user.name, user.email, user.password);
    return user;
  }

  async emailExists(email: string): Promise<boolean> {
    const stmt = this.db.prepare("SELECT * FROM users WHERE email = ?");
    const result = stmt.get(email);
    return result ? true : false;
  }
}

export const userSqliteRepository = new UserSqliteRepository(sqlite);
