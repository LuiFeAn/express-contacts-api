import { z } from "zod";

export const RegisterContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z
    .string()
    .min(1)
    .regex(/^\d{10,11}$/),
  userId: z.number().min(1).optional(),
});

export type RegisterContactRequest = z.infer<typeof RegisterContactSchema>;
