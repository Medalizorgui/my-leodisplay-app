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

import ProductForm from "./ProductForm"; // Adjust import to your product form
import { type ProductSchema } from "@/lib/zod"; // Adjust to your schema for products
import { Product } from "@prisma/client"; // Adjust if your product model is defined differently
import { Pencil1Icon } from "@radix-ui/react-icons";

export default function UpdateProduct({ product }: { product: Product }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isDialogOpen, setDialogOpen] = useState(false);

    const onSubmit = async (data: ProductSchema) => {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/products", { // Adjust API endpoint as necessary
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, id: product.id }), // Ensure your product model has an id
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(
                    responseData.message || "Failed to update product"
                );
            }

            setErrorMessage("");
            setDialogOpen(false); // Close the dialog on successful submission

        } catch (error) {
            console.error("Error updating product:", error);
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
                    <DialogTitle>Update Product</DialogTitle>
                </DialogHeader>
                {errorMessage && (
                    <div className="text-red-500 text-sm mb-4">
                        {errorMessage}
                    </div>
                )}
                <ProductForm
                    defaultValues={{
                        nom: product.nom,
                        description: product.description || "",
                        image: product.image || "",
                        prix: product.prix.toString(),
                        type: product.type || [],
                        base: product.base || [],
                        taille: product.taille || [],
                        barre: product.barre || [],
                    }}
                    onSubmit={onSubmit}
                    submitButtonText="Update"
                    isSubmitting={isSubmitting}
                />
            </DialogContent>
        </Dialog>
    );
}
