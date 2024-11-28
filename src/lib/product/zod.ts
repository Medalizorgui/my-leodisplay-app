import { z } from "zod";

export const productSchema = z.object({
    nom: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    image: z.string().url("Must be a valid URL"),
    prix: z.string().refine(
        (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, 
        "Price must be a positive number"
    ),
    type: z.array(z.string()).optional(), 
    barre: z.array(z.string()).optional(), 
    bases: z.array(z.object({
        name: z.string().min(1, "Base name is required"),
        image: z.string().url("Base image must be a valid URL"),
        price: z.number().positive("Base price must be positive")
    })).optional(),
    tailles: z.array(z.object({
        name: z.string().min(1, "Taille name is required"),
        image: z.string().url("Taille image must be a valid URL"),
        downloadLink: z.string().optional(),
        price: z.number().positive("Taille price must be positive")
    })).optional()
});

export type ProductSchema = z.infer<typeof productSchema>;