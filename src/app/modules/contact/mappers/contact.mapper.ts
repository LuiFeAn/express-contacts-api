import { Contact } from "../model";
import { ContactResponse } from "../responses/contact.response";


export class ContactMapper {
  static toResponse(contact: Contact): ContactResponse {
    return {
      id: contact.id || 0,
      name: contact.name,
      email: contact.email || "",
      phone: contact.phone,
      createdAt: contact.createdAt || new Date(),
      updatedAt: contact.updatedAt || new Date(),
    };
  }
}

