"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import OrderForm from "./OrderForm"; // Adjust import to your order form
import { type OrderSchema } from "@/lib/order/zod"; // Adjust to your schema for orders
import { Order } from "@prisma/client"; // Adjust if your order model is defined differently
import { Pencil1Icon } from "@radix-ui/react-icons";

export default function UpdateOrder({ order }: { order: Order & { id: number } }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isDialogOpen, setDialogOpen] = useState(false);

    const onSubmit = async (data: OrderSchema) => {
        setIsSubmitting(true);
        const validStatus = data.status === "livree" || data.status === "attente" ? data.status : "attente";
        try {
            const response = await fetch("/api/orders", { // Adjust API endpoint as necessary
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, id: order.id, status: validStatus }), // Ensure your order model has an id
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(
                    responseData.message || "Failed to update order"
                );
            }

            setErrorMessage("");
            setDialogOpen(false); // Close the dialog on successful submission

        } catch (error) {
            console.error("Error updating order:", error);
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred";
            setErrorMessage(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDialogOpen = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering dialog close
        setDialogOpen(true); // Explicitly open the dialog
    };

    const handleFormClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent clicks on the form from closing the dialog
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="mr-1 text-blue-500 bg-blue-100 hover:text-blue-700 hover:bg-blue-200"
                    onClick={handleDialogOpen}
                >
                    <Pencil1Icon className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white" onClick={handleFormClick}>
                <DialogHeader>
                    <DialogTitle>Update Order</DialogTitle>
                </DialogHeader>
                {errorMessage && (
                    <div className="text-red-500 text-sm mb-4">
                        {errorMessage}
                    </div>
                )}
                <OrderForm
                    defaultValues={{
                        orderGroupId: order.orderGroupId,
                        status: (order.status as "livree" | "attente") || "attente", // Casting with a fallback
                        qty: order.qty,
                        email: order.email,
                        name: order.name,
                        productId: order.productId,
                        selectedType: order.selectedType || "",
                        selectedBase: order.selectedBase || "",
                        selectedTaille: order.selectedTaille || "",
                        selectedBarre: order.selectedBarre || "",
                        image: order.image || "",
                    }}
                    onSubmit={onSubmit}
                    submitButtonText="Update Order"
                    isSubmitting={isSubmitting}
                />
            </DialogContent>
        </Dialog>
    );
}
