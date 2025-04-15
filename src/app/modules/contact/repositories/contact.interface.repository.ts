import { IBaseRepository, QueryParamsType } from "../../../@shared/repository/base.repository";
import { Contact } from "../model";
import { IListResourceRequest, IListResourceResponse } from "../../../@shared/interfaces/list-resource.interface";
export interface IContactRepository extends IBaseRepository<Contact> {
    create(data: Contact): Promise<Contact>;
    findByPhone(userId: number, phone: string): Promise<Contact | null>;
    findByEmail(userId: number, email: string): Promise<Contact | null>;
    findById(id: number): Promise<Contact | null>;
    delete(id: number): Promise<boolean>;
    findAllPaginated(query: QueryParamsType<Contact>, pagination: IListResourceRequest<Contact>): Promise<IListResourceResponse<Contact>>;
}
