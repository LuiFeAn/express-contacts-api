import { Database } from "sqlite3";
import { IUserRepository } from "./user.interface.repository";
import { User } from "../model";
import sqlite from "../../../@shared/database/sqlite";
import { IUser } from "../model/interface";
import { UserMapper } from "../mappers/user.mapper";

export class UserSqliteRepository implements IUserRepository {
  constructor(private readonly db: Database) {}

  async create(user: User): Promise<User> {
    const raw: IUser = await new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [user.name, user.email, user.password],
        (err) => {
          if (err) reject(err);
          else resolve(user);
        }
      );
    });
    return UserMapper.sqliteToDomain(raw);
  }

  async findByEmail(email: string): Promise<User | null> {
    const raw: IUser = await new Promise((resolve, reject) => {
      this.db.get(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, row) => {
          if (err) reject(err);
          else resolve(row as unknown as User);
        }
      );
    });
    if (!raw) {
      return null;
    }
    return UserMapper.sqliteToDomain(raw);
  }

  async emailExists(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, row) => {
          if (err) reject(err);
          else resolve(!!row);
        }
      );
    });
  }
}

export const userSqliteRepository = new UserSqliteRepository(sqlite);
