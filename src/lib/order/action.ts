"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Define the schema for order data validation
const OrderSchema = z.object({
  orderGroupId: z
    .string(),
  status: z.enum(["livree", "attente"], {
    message: "Status must be 'delivered' or 'pending'",
  }),
  image: z.string().optional(),
  qty: z
    .number()
    .int()
    .positive({ message: "Quantity must be a positive integer" }),
  email: z.string().email({ message: "Invalid email format" }),
  name: z.string().min(1, { message: "Customer's name is required" }),
  productNom: z.string().min(1, { message: "Product name is required" }),

  // Validating selected values from the product options
  selectedType: z.string().optional(),
  selectedBase : z.string().optional(),
  baseQuantity: z.number().int().optional(),
  selectedTaille : z.string().optional(),
  tailleQuantity : z.number().int().optional(),
  selectedBarre: z
    .string()
    .min(1, { message: "Product barre selection is required" }).optional(),
  price : z.string().optional(),
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
    // Prepare the `data` object for Prisma create
    


    // Create the order in the database
    await prisma.order.create({ data : {
      orderGroupId : validatedFields.data.orderGroupId,
      status : validatedFields.data.status,
      image : validatedFields.data.image ,
      qty : validatedFields.data.qty,
      email : validatedFields.data.email,
      name : validatedFields.data.name,
      productNom : validatedFields.data.productNom,
      selectedType : validatedFields.data.selectedType,
      selectedBarre: validatedFields.data.selectedBarre,
      selectedBaseName : validatedFields.data.selectedBase ,
      baseQuantity : validatedFields.data.baseQuantity,
      selectedTailleName : validatedFields.data.selectedTaille,
      tailleQuantity : validatedFields.data.tailleQuantity,
      price: validatedFields.data.price,

    }});
  } catch (error) {
    console.error("Error creating order:", error);
    return { message: "Failed to create new order" };
  }

  // Revalidate and redirect to the orders page
  revalidatePath("/orders");
  redirect("/orders");
};
