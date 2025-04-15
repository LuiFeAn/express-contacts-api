import { z } from "zod";
import { ResourceListRequestSchema } from "../../../@shared/requests/resource-list.request";

export const ListContactSchema = ResourceListRequestSchema.extend({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().min(10).max(15).optional(),
    sort: z.string().optional().default("createdAt"),
});

export type ListContactRequest = z.infer<typeof ListContactSchema>;


