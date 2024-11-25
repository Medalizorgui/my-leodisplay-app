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
import { PrinterIcon } from "lucide-react";
import InvoiceContent from "./InvoiceContent"; // Import the logic component

export default function InvoiceDialog({ order }: { order: any }) {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleDialogOpen = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDialogOpen(true);
    };

    const handleFormClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="mr-1 text-green-500 bg-green-100 hover:text-green-700 hover:bg-green-200"
                    onClick={handleDialogOpen}
                >
                    <PrinterIcon className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-white" onClick={handleFormClick}>
                <DialogHeader>
                    <DialogTitle>Invoice</DialogTitle>
                </DialogHeader>
                <InvoiceContent order={order} closeDialog={() => setDialogOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
