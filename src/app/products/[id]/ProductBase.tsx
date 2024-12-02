import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ProductBaseProps = {
  baseData: any[]; // Expected base data from the ClientComponent
};

export function ProductBase({ baseData }: ProductBaseProps) {
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
                    onClick={() =>
                      console.log(`Decreasing quantity for base ${base.id}`)
                    }
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">0</span>{" "}
                  {/* Replace with dynamic quantity */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      console.log(`Increasing quantity for base ${base.id}`)
                    }
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
