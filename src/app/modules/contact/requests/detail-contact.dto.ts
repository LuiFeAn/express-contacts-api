import { z } from "zod";

export const detailContactSchema = z.object({
  id: z.number(),
});

export type DetailContactRequest = z.infer<typeof detailContactSchema>;
