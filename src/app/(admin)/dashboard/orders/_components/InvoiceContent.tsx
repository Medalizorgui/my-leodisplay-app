"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

export default function InvoiceContent({ order, closeDialog }: { order: any; closeDialog: () => void }) {
    const [isGenerating, setIsGenerating] = useState(false);

    const generatePDF = () => {
        setIsGenerating(true);
        try {
            const doc = new jsPDF();

            // Add order details to the PDF
            doc.setFontSize(20);
            doc.text("Invoice", 105, 20, { align: "center" });

            doc.setFontSize(12);
            doc.text(`Order ID: ${order.id}`, 20, 40);
            doc.text(`Customer Name: ${order.name}`, 20, 50);
            doc.text(`Email: ${order.email}`, 20, 60);
            doc.text(`Product Name: ${order.product}`,20,60)
            doc.text(`Status: ${order.status}`, 20, 70);
            doc.text(`Quantity: ${order.qty}`, 20, 80);

            if (order.image) {
                // Add product image (if available)
                const imgData = order.image; // Ensure this is a base64-encoded image
                doc.addImage(imgData, "JPEG", 20, 90, 50, 50);
            }

            doc.text("Order Summary:", 20, 150);
            doc.text(`Selected Type: ${order.selectedType}`, 20, 160);
            doc.text(`Selected Base: ${order.selectedBase}`, 20, 170);
            doc.text(`Selected Taille: ${order.selectedTaille}`, 20, 180);
            doc.text(`Selected Barre: ${order.selectedBarre}`, 20, 190);

            // Save the PDF
            doc.save(`invoice_${order.id}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="text-sm">
                <p>
                    <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                    <strong>Customer Name:</strong> {order.name}
                </p>
                <p>
                    <strong>Email:</strong> {order.email}
                </p>
                <p>
                    <strong>Product Name:</strong> {order.product}
                </p>
                <p>
                    <strong>Status:</strong> {order.status}
                </p>
                <p>
                    <strong>Quantity:</strong> {order.qty}
                </p>
                <p>
                    <strong>Selected Type:</strong> {order.selectedType}
                </p>
                <p>
                    <strong>Selected Base:</strong> {order.selectedBase}
                </p>
                <p>
                    <strong>Selected Taille:</strong> {order.selectedTaille}
                </p>
                <p>
                    <strong>Selected Barre:</strong> {order.selectedBarre}
                </p>
            </div>
            <Button
                onClick={generatePDF}
                disabled={isGenerating}
                className={isGenerating ? "opacity-50" : ""}
            >
                {isGenerating ? "Generating..." : "Download PDF"}
            </Button>
            <Button variant="ghost" onClick={closeDialog}>
                Close
            </Button>
        </div>
    );
}
