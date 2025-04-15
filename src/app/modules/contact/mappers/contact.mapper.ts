import { Contact } from "../model";
import { ContactResponse } from "../responses/contact.response";
import { CreatedContactResponse } from "../responses/created-contact.response";

export class ContactMapper {
  static toDetailResponse(contact: Contact): ContactResponse {
    return {
      id: contact.id,
      name: contact.name,
      email: contact.email || "",
      phone: contact.phone,
      createdAt: contact.createdAt,
      updatedAt: contact.updatedAt,
    };
  }

  static toCreatedResponse(contact: Contact): CreatedContactResponse {
    return {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    };
  }
}
