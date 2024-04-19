


import { z } from "zod";





export const MessageSchema = z.object({
    content:z.string()
    .min(10,"Content must be atleast 10 characters")
    .max(300,"Content must be No longer 300 characters")
    ,


})


