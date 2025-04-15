import { z } from "zod";

export const DetailContactSchema = z.object({
  id: z.string().transform((val) => parseInt(val)),
});

export type DetailContactRequest = z.infer<typeof DetailContactSchema>;
