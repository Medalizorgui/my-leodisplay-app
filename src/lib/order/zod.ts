import { z } from "zod";

export const orderSchema = z.object({
    orderGroupId: z.string(),
    status: z.enum(["livree", "attente"]),
    image: z.string().optional(),
    qty: z.number().int().positive(),
    email: z.string().email(),
    name: z.string().min(1),
    productNom: z.string().min(1),
    selectedType: z.string().nullable(),
    selectedBase: z.string().optional(),
    baseQuantity: z.number().int().optional(),
    selectedTaille: z.string().optional(),
    tailleQuantity: z.number().int().optional(),
    selectedBarre: z.string().nullable(),
});

export type OrderSchema = z.infer<typeof orderSchema>;
