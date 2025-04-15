import { z } from "zod";
import { ResourceListRequestSchema } from "../../../@shared/requests/resource-list.request";
import { Contact } from "../model";

export const contactSortKeys = Object.keys(Contact);

export const ListContactSchema = ResourceListRequestSchema.extend({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().min(10).max(15).optional(),
    sort: z.enum(contactSortKeys as [string, ...string[]]).optional(),
});

export type ListContactRequest = z.infer<typeof ListContactSchema>;


