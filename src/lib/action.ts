"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Define the schema for product data validation
const ProductSchema = z.object({
  nom: z.string().min(1, { message: "Product name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  image: z.string().url({ message: "Image must be a valid URL" }),
  prix: z.number().positive({ message: "Price must be a positive number" }),
  type: z.array(z.string()).nonempty({ message: "At least one type is required" }),
  base: z.array(z.string()).optional(),
  taille: z.array(z.string()).optional(),
  barre: z.array(z.string()).optional(),
});

export const saveProduct = async (prevState: any, formData: FormData) => {
  const validatedFields = ProductSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.product.create({
      data: {
        nom: validatedFields.data.nom,
        description: validatedFields.data.description,
        image: validatedFields.data.image,
        prix: validatedFields.data.prix,
        type: validatedFields.data.type,
        base: validatedFields.data.base || [],
        taille: validatedFields.data.taille || [],
        barre: validatedFields.data.barre || [],
      },
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return { message: "Failed to create new product" };
  }

  // Revalidate and redirect to the products page
  revalidatePath("/products");
  redirect("/products");
};
