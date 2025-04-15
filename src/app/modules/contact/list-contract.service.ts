import { IBaseService } from "../../@shared/services/base.service";
import { Contact } from "./model";
import { IContactRepository } from "./repositories/contact.interface.repository";
import { IResourceListResponse } from "../../@shared/responses/resource-list.response";
import { contactSqliteRepository } from "./repositories/contact.sqlite.repository";

interface IListContractInput {
    userId: number;
    page: number;
    limit: number;
    sort: keyof Contact;
    order: "asc" | "desc";
}

export class ListContractService implements IBaseService<IListContractInput, IResourceListResponse<Contact>> {
    constructor(private readonly contactRepository: IContactRepository) { }

    async execute(input: IListContractInput): Promise<IResourceListResponse<Contact>> {
        return this.contactRepository.findAllPaginated(input, {
            page: input.page,
            limit: input.limit,
            sort: "createdAt",
            order: "desc"
        });
    }
}


export const listContractService = new ListContractService(contactSqliteRepository);
