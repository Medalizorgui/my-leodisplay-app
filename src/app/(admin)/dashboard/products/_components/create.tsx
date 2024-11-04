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
import { productSchema, type ProductSchema } from "@/lib/zod";
import { useState } from "react";
import ProductForm from "./ProductForm";

export default function CreateProduct() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isDialogOpen, setDialogOpen] = useState(false);

    const form = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            nom: "",
            description: "",
            image: "",
            prix: "",
            type: [],
            base: [],
            taille: [],
            barre: [],
        },
    });
    
    const onSubmit = async (data: ProductSchema) => {
        setIsSubmitting(true);
        setErrorMessage(""); // Reset error message on new submission
        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            console.log(response.status);
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create product");
            }

            // Handle JSON or empty response
            const contentType = response.headers.get("Content-Type") || "";
            const responseData = contentType.includes("application/json")
                ? await response.json()
                : {};
    
            console.log("response body", responseData);

            form.reset();
            setDialogOpen(false);
        } catch (error) {
            console.error("Error creating product:", error);
            setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (open) setErrorMessage(""); // Clear error message when reopening dialog
        }}>
            <DialogTrigger asChild>
                <Button>Creer</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Create New Product</DialogTitle>
                </DialogHeader>
                {errorMessage && (
                    <div className="text-red-500 text-sm mb-4">
                        {errorMessage}
                    </div>
                )}
                <ProductForm
                    defaultValues={{
                        nom: "",
                        description: "",
                        image: "",
                        prix: "",
                        type: [],
                        base: [],
                        taille: [],
                        barre: [],
                    }}
                    onSubmit={onSubmit}
                    submitButtonText="Create"
                    isSubmitting={isSubmitting}
                />
            </DialogContent>
        </Dialog>
    );
}
