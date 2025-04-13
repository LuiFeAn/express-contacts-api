import { IContactRepository } from "./contact.interface.repository";
import { Database } from "sqlite3";
import { Contact } from "../model";
import { IContact } from "../model/interface";
import sqlite from "../../../@shared/database/sqlite";

export class ContactSqliteRepository implements IContactRepository {
  constructor(private readonly db: Database) {}

  async create(data: Contact): Promise<Contact> {
    const raw: IContact = await new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO contacts (name, email, phone, userId) VALUES (?, ?, ?, ?)",
        [data.name, data.email, data.phone, data.userId],
        (err) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });
    return new Contact(raw);
  }

  async findByPhone(userId: number, phone: string): Promise<Contact | null> {
    const raw: IContact = await new Promise((resolve, reject) => {
      this.db.get(
        "SELECT * FROM contacts WHERE phone = ? AND userId = ?",
        [phone, userId],
        (err, row: IContact) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
    if (!raw) return null;
    return new Contact(raw);
  } 

  async findByEmail(userId: number, email: string): Promise<Contact | null> {
    const raw: IContact = await new Promise((resolve, reject) => {
      this.db.get(
        "SELECT * FROM contacts WHERE email = ? AND userId = ?",
        [email, userId],
        (err, row: IContact) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
    if (!raw) return null;
    return new Contact(raw);
  }
}

export const contactSqliteRepository = new ContactSqliteRepository(sqlite);
