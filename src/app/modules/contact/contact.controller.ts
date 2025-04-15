import { IBaseService } from "../../@shared/services/base.service";
import { Contact } from "./model";
import { registerContactService } from "./register-contact.service";
import { RegisterContactRequest } from "./requests/register-contact.dto";
import { Request, Response } from "express";
import { ContactMapper } from "./mappers/contact.mapper";
import { detailContactService } from "./detail-contact.service";

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
    private readonly detailContact: IBaseService<IDetailContactInput, Contact>
  ) {}

  async detail(req: Request, res: Response) {
    const contact = await this.detailContact.execute({
      userId: req.user.id,
      contactId: Number(req.params.id),
    });
    return res.status(200).json(ContactMapper.toResponse(contact));
  }

  async create(req: Request, res: Response) {
    const contact = await this.registerContact.execute({
      ...req.body,
      userId: req.user.id,
    });
    return res.status(201).json(ContactMapper.toResponse(contact));
  }
}

export const contactController = new ContactController(
  registerContactService,
  detailContactService
);
