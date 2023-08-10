import { z, ZodType } from "zod"

type FormData = {
    password: string,
    confirmPassword: string
}

export const schema: ZodType<FormData> = z.object(
    {
        password: z.string().min(5).max(20),
        confirmPassword: z.string().min(5).max(20),
    }
)
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});