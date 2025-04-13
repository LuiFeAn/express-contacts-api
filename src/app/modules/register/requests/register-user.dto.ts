import z from "zod";

export const RegisterUserSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
});

export type RegisterUserRequest = z.infer<typeof RegisterUserSchema>;
