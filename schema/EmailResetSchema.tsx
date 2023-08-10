import { z, ZodType } from "zod"

type FormData = {
    email: string,
}

export const schema: ZodType<FormData> = z.object(
    {
        email: z.string().email(),
    }
)