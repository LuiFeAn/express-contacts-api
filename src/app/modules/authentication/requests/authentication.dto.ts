import z from "zod";

export const AuthenticationSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type AuthenticationRequest = z.infer<typeof AuthenticationSchema>;

