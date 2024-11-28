"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Define the schema for product data validation using the updated `productSchema`
const ProductSchema = z.object({
  nom: z.string().min(1, { message: "Product name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  image: z.string().url({ message: "Image must be a valid URL" }),
  prix: z.string().refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    { message: "Price must be a positive number" }
  ),
  type: z.array(z.string()).optional(),
  barre: z.array(z.string()).optional(),
  bases: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Base name is required" }),
        image: z.string().url({ message: "Base image must be a valid URL" }),
        price: z.number().positive({ message: "Base price must be positive" }),
      })
    )
    .optional(),
  tailles: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Taille name is required" }),
        image: z.string().url({ message: "Taille image must be a valid URL" }),
        downloadLink: z.string().optional(),
        price: z.number().positive({ message: "Taille price must be positive" }),
      })
    )
    .optional(),
});

export const saveProduct = async (prevState: any, formData: FormData) => {
  const formDataObject = Object.fromEntries(formData.entries());

  // Parse nested arrays from FormData (e.g., bases and tailles) if provided as JSON strings
  if (formDataObject.bases) {
    formDataObject.bases = JSON.parse(formDataObject.bases as string);
  }
  if (formDataObject.tailles) {
    formDataObject.tailles = JSON.parse(formDataObject.tailles as string);
  }

  // Validate the form data against the schema
  const validatedFields = ProductSchema.safeParse(formDataObject);

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
        type: validatedFields.data.type || [],
        barre: validatedFields.data.barre || [],
        bases: {
          create: validatedFields.data.bases || [], // Use parsed and validated data
        },
        tailles: {
          create: validatedFields.data.tailles || [], // Use parsed and validated data
        },
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
