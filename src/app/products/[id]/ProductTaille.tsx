import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ProductTailleProps = {
  tailleData: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    downloadlink?: string;
  }>;
  onQuantityChange: (id: string, quantity: number) => void;
};

export function ProductTaille({ tailleData, onQuantityChange }: ProductTailleProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    tailleData.reduce((acc, taille) => {
      acc[taille.id] = 0;
      return acc;
    }, {} as Record<string, number>)
  );

  const handleIncrease = (id: string) => {
    const newQuantity = quantities[id] + 1;
    setQuantities((prev) => ({
      ...prev,
      [id]: newQuantity,
    }));
    onQuantityChange(id, newQuantity);
  };

  const handleDecrease = (id: string) => {
    const newQuantity = Math.max(quantities[id] - 1, 0);
    setQuantities((prev) => ({
      ...prev,
      [id]: newQuantity,
    }));
    onQuantityChange(id, newQuantity);
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-b">
        <AccordionTrigger className="text-lg font-semibold">Taille de produit</AccordionTrigger>
        <AccordionContent className="pt-4">
          <div>
            {tailleData.map((taille) => (
              <div
                key={taille.id}
                className="flex items-center space-x-4 p-4 border rounded-lg mb-4 hover:bg-gray-50 transition-colors"
              >
                <div className="relative w-24 h-24">
                  <Image
                    src={taille.image}
                    alt={taille.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{taille.name}</h3>
                  <p className="font-bold mt-2 text-primary">${taille.price.toFixed(2)}</p>
                  {taille.downloadlink && (
                    <a
                      href={taille.downloadlink}
                      className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                    >
                      Download Size Guide
                    </a>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDecrease(taille.id)}
                    className="h-8 w-8"
                  >
                    -
                  </Button>
                  <span className="w-8 text-center text-lg">
                    {quantities[taille.id]}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleIncrease(taille.id)}
                    className="h-8 w-8"
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

