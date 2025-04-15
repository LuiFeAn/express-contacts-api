import { IBaseService } from "../../@shared/services/base.service";
import { IContactRepository } from "./repositories/contact.interface.repository";
import { contactSqliteRepository } from "./repositories/contact.sqlite.repository";
import { RequestError } from "../../@shared/errors/request.error";

export interface IDeleteContractInput {
    id: number;
    userId: number;
}

export class DeleteContractService implements IBaseService<IDeleteContractInput, boolean> {
    constructor(private readonly contactRepository: IContactRepository) { }

    async execute(input: IDeleteContractInput): Promise<boolean> {
        const contact = await this.contactRepository.findById(input.id);
        if (!contact) {
            throw new RequestError("Contato não encontrado", { statusCode: 404 });
        }
        if (contact.userId !== input.userId) {
            throw new RequestError("Contato não encontrado", { statusCode: 404 });
        }
        return this.contactRepository.delete(input.id);
    }
}

export const deleteContractService = new DeleteContractService(contactSqliteRepository);

