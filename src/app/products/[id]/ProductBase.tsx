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
import { PlusIcon, MinusIcon, ImageIcon } from "lucide-react";

type ProductBaseProps = {
  baseData: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    description?: string;
  }>;
  onQuantityChange: (id: string, quantity: number) => void;
};

export function ProductBase({ baseData, onQuantityChange }: ProductBaseProps) {
  const [selectedBases, setSelectedBases] = useState<{[key: string]: number}>({});

  const handleQuantityChange = (baseId: string, delta: number) => {
    const currentQuantity = selectedBases[baseId] || 0;
    const newQuantity = Math.max(0, currentQuantity + delta);
    
    setSelectedBases(prev => ({
      ...prev,
      [baseId]: newQuantity
    }));
    
    onQuantityChange(baseId, newQuantity);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <ImageIcon className="mr-2 h-4 w-4" /> Customize Base
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select Product Bases</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-4">
          {baseData.map((base) => (
            <Card key={base.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                <div className="space-y-1">
                  <CardTitle>{base.name}</CardTitle>
                  <Badge variant="secondary">${base.price.toFixed(2)}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <img 
                  src={base.image} 
                  alt={base.name} 
                  className="w-full h-48 object-cover rounded-md mb-2" 
                />
                {base.description && (
                  <p className="text-sm text-muted-foreground mb-2">
                    {base.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuantityChange(base.id, -1)}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span>{selectedBases[base.id] || 0}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuantityChange(base.id, 1)}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}