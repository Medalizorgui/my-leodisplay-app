import { z } from "zod";

export const productSchema = z.object({
    nom: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    prix: z.string().optional(), // Adjust if you have specific price constraints
    type: z.array(z.string()).optional(), // Assuming 'type' is an array
    base: z.array(z.string()).optional(), // Optional array field
    taille: z.array(z.string()).optional(), // Optional array field
    barre: z.array(z.string()).optional(), // Optional array field
});

export type ProductSchema = z.infer<typeof productSchema>;
