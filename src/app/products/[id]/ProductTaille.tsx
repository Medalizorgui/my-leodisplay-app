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
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Product taille</AccordionTrigger>
        <AccordionContent>
          <div>
            <h3 className="text-lg font-semibold">Available Sizes (Taille)</h3>
            {tailleData.map((taille) => (
              <div
                key={taille.id}
                className="flex items-center space-x-4 p-4 border rounded-lg"
              >
                <Image
                  src={taille.image}
                  alt={taille.name}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{taille.name}</h3>
                  <p className="font-bold mt-2">${taille.price.toFixed(2)}</p>
                  {taille.downloadlink && (
                    <a
                      href={taille.downloadlink}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Download
                    </a>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDecrease(taille.id)}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">
                    {quantities[taille.id]}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleIncrease(taille.id)}
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