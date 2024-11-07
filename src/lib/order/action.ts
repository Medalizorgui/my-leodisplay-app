"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Define the schema for order data validation
const OrderSchema = z.object({
  orderGroupId: z.number().int().positive({ message: "Order group ID must be a positive integer" }),
  status: z.enum(["delivered", "pending"], { message: "Status must be 'delivered' or 'pending'" }),
  image: z.string().url({ message: "Image must be a valid URL" }),
  qty: z.number().int().positive({ message: "Quantity must be a positive integer" }),
  email: z.string().email({ message: "Invalid email format" }),
  name: z.string().min(1, { message: "Customer's name is required" }),
  productId: z.number().int().positive({ message: "Product ID must be a valid positive integer" }),

  // Validating selected values from the product options
  selectedType: z.string().min(1, { message: "Product type selection is required" }),
  selectedBase: z.string().min(1, { message: "Product base selection is required" }),
  selectedTaille: z.string().min(1, { message: "Product taille selection is required" }),
  selectedBarre: z.string().min(1, { message: "Product barre selection is required" }),
});

export const saveOrder = async (prevState: any, formData: FormData) => {
  const formEntries = Object.fromEntries(formData.entries());

  // Parse and validate the form data using the schema
  const validatedFields = OrderSchema.safeParse(formEntries);

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Create the order in the database using Prisma
    await prisma.order.create({
      data: {
        orderGroupId: validatedFields.data.orderGroupId,
        status: validatedFields.data.status,
        image: validatedFields.data.image,
        qty: validatedFields.data.qty,
        email: validatedFields.data.email,
        name: validatedFields.data.name,
        productId: validatedFields.data.productId,
        selectedType: validatedFields.data.selectedType,
        selectedBase: validatedFields.data.selectedBase,
        selectedTaille: validatedFields.data.selectedTaille,
        selectedBarre: validatedFields.data.selectedBarre,
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return { message: "Failed to create new order" };
  }

  // Revalidate and redirect to the orders page
  revalidatePath("/orders");
  redirect("/orders");
};
