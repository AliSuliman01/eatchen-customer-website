import { z, ZodType } from "zod"

type FormData = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

export const schema: ZodType<FormData> = z.object(
    {
        username: z.string().min(2).max(30),
        email: z.string().email(),
        password: z.string().min(5).max(20),
        confirmPassword: z.string().min(5).max(20),
    }
)
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});