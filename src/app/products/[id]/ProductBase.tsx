import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ProductBaseProps = {
  baseData: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
  }>;
  onQuantityChange: (id: string, quantity: number) => void;
};

export function ProductBase({ baseData, onQuantityChange }: ProductBaseProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    baseData.reduce((acc, base) => {
      acc[base.id] = 0;
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
        <AccordionTrigger>Product Base</AccordionTrigger>
        <AccordionContent>
          <div>
            <h3 className="text-lg font-semibold">Available Base</h3>
            {baseData.map((base) => (
              <div
                key={base.id}
                className="flex items-center space-x-4 p-4 border rounded-lg"
              >
                <Image
                  src={base.image}
                  alt={base.name}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{base.name}</h3>
                  <p className="font-bold mt-2">${base.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDecrease(base.id)}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">
                    {quantities[base.id]}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleIncrease(base.id)}
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