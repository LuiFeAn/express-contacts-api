import { IBaseService } from "../../@shared/services/base.service";
import { Contact } from "./model";
import { registerContactService } from "./register-contact.service";
import { RegisterContactRequest } from "./requests/register-contact.dto";
import { Request, Response } from "express";
import { ContactMapper } from "./mappers/contact.mapper";
import { detailContactService } from "./detail-contact.service";
import { deleteContractService, DeleteContractService, IDeleteContractInput } from "./delete-contract.service";
import { ListContactRequest } from "./requests/list-contact.dto";
import { listContractService, ListContractService } from "./list-contract.service";
import { IResourceListResponse } from "../../@shared/responses/resource-list.response";

export interface IDetailContactInput {
  userId: number;
  contactId: number;
}

export class ContactController {
  constructor(
    private readonly registerContact: IBaseService<
      RegisterContactRequest,
      Contact
    >,
    private readonly detailContact: IBaseService<IDetailContactInput, Contact>,
    private readonly deleteContact: IBaseService<IDeleteContractInput, boolean>,
    private readonly listContact: IBaseService<ListContactRequest, IResourceListResponse<Contact>>
  ) { }

  async detail(req: Request, res: Response) {
    const contact = await this.detailContact.execute({
      userId: req.user.id,
      contactId: req.params.id as unknown as number,
    });
    return res.status(200).json(ContactMapper.toDetailResponse(contact));
  }

  async delete(req: Request, res: Response) {
    const contact = await this.deleteContact.execute({
      userId: req.user.id,
      id: req.params.id as unknown as number,
    });
    return res.status(200).json(contact);
  }

  async list(req: Request, res: Response) {
    const contacts = await this.listContact.execute(req.body);
    const mappedContacts = contacts.items.map((contact) =>
      ContactMapper.toDetailResponse(contact)
    );
    return res.status(200).json(mappedContacts);
  }

  async create(req: Request, res: Response) {
    const contact = await this.registerContact.execute({
      ...req.body,
      userId: req.user.id,
    });
    return res.status(201).json(ContactMapper.toCreatedResponse(contact));
  }
}

export const contactController = new ContactController(
  registerContactService,
  detailContactService,
  deleteContractService,
  listContractService
);
