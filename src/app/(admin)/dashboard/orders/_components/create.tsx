"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { orderSchema, type OrderSchema } from "@/lib/order/zod"; // Import the OrderSchema
import { useState } from "react";
import OrderForm from "./OrderForm"; // This is your custom order form component

export default function CreateOrder() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);

  const form = useForm<OrderSchema>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      orderGroupId: 1, // Add default value
      status: "attente", // default to 'pending'
      image: "",
      qty: 1,
      email: "",
      name: "",
      productNom: "", // Add default value
      selectedType: "",
      selectedBase: "",
      baseQuantity : 0,
      selectedTaille: "",
      tailleQuantity: 0,
      selectedBarre: "",
    },
  });

  const onSubmit = async (orderData: OrderSchema) => {
    setIsSubmitting(true);
    setErrorMessage(""); // Reset error message on new submission
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      console.log(response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create order");
      }

      // Handle JSON or empty response
      const contentType = response.headers.get("Content-Type") || "";
      const responseData = contentType.includes("application/json")
        ? await response.json()
        : {};

      console.log("response body", responseData);

      form.reset(); // Reset form after successful submission
      setDialogOpen(false); // Close the dialog
    } catch (error) {
      console.error("Error creating order:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
        if (open) setErrorMessage(""); // Clear error message when reopening dialog
      }}
    >
      <DialogTrigger asChild>
        <Button>Creer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
        </DialogHeader>
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
        )}
        <OrderForm
          defaultValues={{
            orderGroupId: 1, // Add default value
            status: "attente", // default to 'pending'
            image: "",
            qty: 1,
            email: "",
            name: "",
            productNom: "", // Add default value
            selectedType: "",
            selectedBase: "",
            baseQuantity: 0,
            selectedTaille:"",
            tailleQuantity: 0,
            selectedBarre: "",
          }} // Pass defaultValues to OrderForm
          onSubmit={onSubmit}
          submitButtonText="Create"
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
