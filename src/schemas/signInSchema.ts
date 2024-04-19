


import { z } from "zod";





export const signInSchema = z.object({
    identfier:z.string(),
    password:z.string(),

})


