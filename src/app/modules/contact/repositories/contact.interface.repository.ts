import { IBaseRepository } from "../../../@shared/repository/base.repository";
import { Contact } from "../model";

export interface IContactRepository extends IBaseRepository<Contact> {
    create(data: Contact): Promise<Contact>;
    findByPhone(userId: number, phone: string): Promise<Contact | null>;
    findByEmail(userId: number, email: string): Promise<Contact | null>;
}
