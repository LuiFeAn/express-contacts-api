import { IBaseService } from "../../@shared/services/base.service";
import { Contact } from "./model";
import { RegisterContactRequest } from "./requests/register-contact.dto";
import { Request, Response } from "express";

export class ContactController {
  constructor(
    private readonly contactService: IBaseService<
      Contact,
      RegisterContactRequest
    >
  ) {}

  async create(req: Request, res: Response) {
    const contact = await this.contactService.execute({
        ...req.body,
        userId: req.user.id,
    });
    return res.status(201).json(contact);
  }
}
