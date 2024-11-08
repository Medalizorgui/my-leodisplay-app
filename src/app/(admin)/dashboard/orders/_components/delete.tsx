"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

export default function DeleteOrder({ orderId }: { orderId: string }) {
    const handleDelete = async () => {
        const response = await fetch(`/api/orders?id=${orderId}`, { // Adjust the API endpoint to orders
            method: "DELETE",
        });
        
        if (response.ok) {
            console.log("Order deleted successfully");
            // Optionally, refresh your order list by updating state in a parent component
        } else {
            console.error("Failed to delete order");
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
