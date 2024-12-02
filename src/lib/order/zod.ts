import { z } from "zod";

export const orderSchema = z.object({
    orderGroupId: z.number().int().positive(),
    status: z.enum(["livree", "attente"]),
    image: z.string().optional(),
    qty: z.number().int().positive(),
    email: z.string().email(),
    name: z.string().min(1),
    productNom: z.string().min(1),
    selectedType: z.string().min(1).optional(),
    selectedBase: z.string().min(1).optional(),
    baseQuantity: z.number().int().positive().optional(),
    selectedTaille: z.string().min(1).optional(),
    tailleQuantity: z.number().int().positive(),
    selectedBarre: z.string().min(1).optional(),
});

export type OrderSchema = z.infer<typeof orderSchema>;
