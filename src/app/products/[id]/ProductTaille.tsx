import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Image as LucideImage } from "lucide-react";

type ProductTailleProps = {
  tailleData: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    description?: string;
    downloadlink?: string;
  }>;
  onQuantityChange: (id: string, quantity: number) => void;
};

export function ProductTaille({ tailleData, onQuantityChange }: ProductTailleProps) {
  const [selectedTailles, setSelectedTailles] = useState<{[key: string]: number}>({});

  const handleQuantityChange = (tailleId: string, delta: number) => {
    const currentQuantity = selectedTailles[tailleId] || 0;
    const newQuantity = Math.max(0, currentQuantity + delta);
    
    setSelectedTailles(prev => ({
      ...prev,
      [tailleId]: newQuantity
    }));
    
    onQuantityChange(tailleId, newQuantity);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <LucideImage className="mr-2 h-4 w-4" /> Customize Sizes
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select Product Sizes</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-4">
          {tailleData.map((taille) => (
            <Card key={taille.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                <div className="space-y-1">
                  <CardTitle>{taille.name}</CardTitle>
                  <Badge variant="secondary">${taille.price.toFixed(2)}</Badge>
                </div>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <LucideImage className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <img 
                      src={taille.image} 
                      alt={taille.name} 
                      className="rounded-md max-w-[200px]" 
                    />
                  </HoverCardContent>
                </HoverCard>
              </CardHeader>
              <CardContent>
                {taille.description && (
                  <p className="text-sm text-muted-foreground mb-2">
                    {taille.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuantityChange(taille.id, -1)}
                  >
                    -
                  </Button>
                  <span>{selectedTailles[taille.id] || 0}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuantityChange(taille.id, 1)}
                  >
                    +
                  </Button>
                </div>
                {taille.downloadlink && (
                  <a 
                    href={taille.downloadlink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-xs mt-2 block"
                  >
                    Download Size Guide
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}