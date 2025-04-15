import { IBaseService } from "../../@shared/services/base.service";
import { Contact } from "./model";
import { IContactRepository } from "./repositories/contact.interface.repository";
import { IResourceListResponse } from "../../@shared/responses/resource-list.response";
import { contactSqliteRepository } from "./repositories/contact.sqlite.repository";
import { ListContactRequest } from "./requests/list-contact.dto";

export interface IListContractInput extends ListContactRequest {
    userId: number;
}

export class ListContractService implements IBaseService<IListContractInput, IResourceListResponse<Contact>> {
    constructor(private readonly contactRepository: IContactRepository) { }

    async execute(input: IListContractInput): Promise<IResourceListResponse<Contact>> {
        return this.contactRepository.findAllPaginated(input, {
            page: input.page,
            limit: input.limit,
            sort: input.sort as keyof Contact,
            order: input.order
        });
    }
}


export const listContractService = new ListContractService(contactSqliteRepository);
