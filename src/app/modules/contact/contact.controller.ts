import { IBaseService } from "../../@shared/services/base.service";
import { Contact } from "./model";
import { registerContactService } from "./register-contact.service";
import { RegisterContactRequest } from "./requests/register-contact.dto";
import { Request, Response } from "express";
import { ContactMapper } from "./mappers/contact.mapper";
export class ContactController {
  constructor(
    private readonly registerContact: IBaseService<
      RegisterContactRequest,
      Contact
    >
  ) {}

  async create(req: Request, res: Response) {
    const contact = await this.registerContact.execute({
      ...req.body,
      userId: req.user.id,
    });
    return res.status(201).json(ContactMapper.toResponse(contact));
  }
}

export const contactController = new ContactController(registerContactService);
