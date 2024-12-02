import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


type ProductTailleProps = {
  tailleData: any[]; // Expected taille data from the ClientComponent
};

export function ProductTaille({tailleData }: ProductTailleProps) {
  return (
    <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Product taille</AccordionTrigger>
    <AccordionContent>
    <div>
      <h3 className="text-lg font-semibold">Available Sizes (Taille)</h3>
      {tailleData.map((taille) => (
        <div key={taille.id} className="flex items-center space-x-4 p-4 border rounded-lg">
          <Image src={taille.image} alt={taille.name} width={100} height={100} className="rounded-md" />
          <div className="flex-grow">
            <h3 className="font-semibold">{taille.name}</h3>
            <p className="font-bold mt-2">${taille.price.toFixed(2)}</p>
            {taille.downloadlink && (
              <a href={taille.downloadlink} className="text-blue-600 hover:underline text-sm">
                Download
              </a>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={() => console.log(`Decreasing quantity for taille ${taille.id}`)}>-</Button>
            <span className="w-8 text-center">0</span> {/* Replace with dynamic quantity */}
            <Button variant="outline" size="icon" onClick={() => console.log(`Increasing quantity for taille ${taille.id}`)}>+</Button>
          </div>
        </div>
      ))}
    </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>


  );
}
