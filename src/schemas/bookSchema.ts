import {z} from "zod";

export const bookSchema = z.object({
    title: z.string(),
    author: z.string(),
    genre: z.string(),
    publishedYear: z.number(),
  

});