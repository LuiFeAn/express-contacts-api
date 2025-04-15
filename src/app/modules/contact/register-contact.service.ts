import { IBaseService } from "../../@shared/services/base.service";
import { Contact } from "./model";
import { RegisterContactRequest } from "./requests/register-contact.dto";
import { IContactRepository } from "./repositories/contact.interface.repository";
import { contactSqliteRepository } from "./repositories/contact.sqlite.repository";
import { RequestError } from "../../@shared/errors/request.error";

interface IRegisterContactInput {
  name: string;
  phone: string;
  email?: string;
  userId: number;
}

export class RegisterContactService
  implements IBaseService<Contact, RegisterContactRequest>
{
  constructor(private readonly contactRepository: IContactRepository) {}

  async execute(dto: IRegisterContactInput): Promise<Contact> {
    const promises = [
      this.contactRepository.findByPhone(dto.userId, dto.phone),
      this.contactRepository.findByEmail(dto.userId, dto?.email || ""),
    ];

    const [contactByPhone, contactByEmail] = await Promise.all(promises);

    if (contactByPhone || contactByEmail) {
      throw new RequestError("Contato já cadastrado", {
        statusCode: 409,
      });
    }

    const contact = new Contact(dto);

    return this.contactRepository.create(contact);
  }
}

export const registerContactService = new RegisterContactService(
  contactSqliteRepository
);
