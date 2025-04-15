import { IContactRepository } from "./contact.interface.repository";
import { Database } from "sqlite3";
import { Contact } from "../model";
import { IContact } from "../model/interface";
import sqlite from "../../../@shared/database/sqlite";
import { QueryParamsType } from "../../../@shared/repository/base.repository";
import { IResourceListResponse } from "../../../@shared/responses/resource-list.response";
import { IListResourceRequest } from "../../../@shared/interfaces/list-resource.interface";

export class ContactSqliteRepository implements IContactRepository {
  constructor(private readonly db: Database) { }

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

  async findById(id: number): Promise<Contact | null> {
    const raw: IContact = await new Promise((resolve, reject) => {
      this.db.get("SELECT * FROM contacts WHERE id = ?", [id], (err, row: IContact) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    if (!raw) return null;
    return new Contact(raw);
  }

  async delete(id: number): Promise<boolean> {
    const result = await new Promise((resolve, reject) => {
      this.db.run("DELETE FROM contacts WHERE id = ?", [id], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
    return Boolean(result);
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

  async findAllPaginated(query: QueryParamsType<Contact>, pagination: IListResourceRequest<Contact>): Promise<IResourceListResponse<Contact>> {
    const { name, email, phone, userId } = query || {};
    const { page, limit, sort, order } = pagination || {};

    const offset = (page - 1) * limit;
    const limitValue = limit;

    let whereLike = '';
    let whereParams: string[] = [];

    if (name) {
      whereLike += `name LIKE '%?%'`;
      whereParams.push(name);
    }
    if (email) {
      whereLike += `email LIKE '%?%'`;
      whereParams.push(email);
    }
    if (phone) {
      whereLike += `phone LIKE '%?%'`;
      whereParams.push(phone);
    }

    const orderBy = `ORDER BY ${sort} ${order}`;

    const queryString = `SELECT * FROM contacts WHERE userId = ? ${whereLike} ${orderBy} LIMIT ? OFFSET ?`;


    const result: IContact[] = await new Promise((resolve, reject) => {
      this.db.all(queryString, [userId, ...whereParams, limitValue, offset], (err, rows: IContact[]) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    const items = result.map((row: IContact) => new Contact(row));

    return {
      items,
      total: result.length,
      page,
      limit,
    };
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
