"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

export default function DeleteProduct({ id }: { id: string }) {
    const handleDelete = async () => {
        const response = await fetch(`/api/products?id=${id}`, { // Adjust the API endpoint to products
            method: "DELETE",
        });
        if (response.ok) {
            console.log("Product deleted successfully");
            // Optionally, you can refresh your product list here by updating state in a parent component
        } else {
            console.error("Failed to delete product");
        }
    };

    return (
        <Button
            onClick={handleDelete}
            variant="ghost"
            size="icon"
            className="mr-1 text-red-500 bg-red-100 hover:text-red-700 hover:bg-red-200"
        >
            <TrashIcon className="h-4 w-4" />
        </Button>
    );
}
