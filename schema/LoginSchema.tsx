import { z, ZodType } from "zod"

type FormData = {
    email: string,
    password: string,
    remember_me: boolean
}

export const schema: ZodType<FormData> = z.object(
    {
        email: z.string().email(),
        password: z.string().min(5).max(20),
        remember_me: z.boolean()
    }
)