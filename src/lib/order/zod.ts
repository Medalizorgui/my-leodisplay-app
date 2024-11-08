import { z } from "zod";

export const orderSchema = z.object({
    orderGroupId: z.number().int().positive(),
    status: z.enum(["livree", "attente"]),
    image: z.string().optional(),
    qty: z.number().int().positive(),
    email: z.string().email(),
    name: z.string().min(1),
    productId: z.number().int().positive(),
    selectedType: z.string().min(1),
    selectedBase: z.string().min(1),
    selectedTaille: z.string().min(1),
    selectedBarre: z.string().min(1),
});

export type OrderSchema = z.infer<typeof orderSchema>;
