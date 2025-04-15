import { IBaseService } from "../../@shared/services/base.service";
import { DetailContactRequest } from "./requests/detail-contact.dto";
import { IContactRepository } from "./repositories/contact.interface.repository";
import { RequestError } from "../../@shared/errors/request.error";
import { contactSqliteRepository } from "./repositories/contact.sqlite.repository";
import { Contact } from "./model";

interface IDetailContactInput {
  userId: number;
  contactId: number;
}

export class DetailContactService
  implements IBaseService<IDetailContactInput, Contact>
{
  constructor(private readonly contactRepository: IContactRepository) {}

  async execute(dto: IDetailContactInput): Promise<Contact> {
    const contact = await this.contactRepository.findById(dto.contactId);
    if (!contact) {
      throw new RequestError("Contato não encontrado", {
        statusCode: 404,
      });
    }
    if (contact.userId !== dto.userId) {
      throw new RequestError("Contato não encontrado", {
        statusCode: 404,
      });
    }
    return contact;
  }
}

export const detailContactService = new DetailContactService(
  contactSqliteRepository
);
