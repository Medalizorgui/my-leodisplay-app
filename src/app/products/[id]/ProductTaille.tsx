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
import { Image as LucideImage, FileText, Download } from "lucide-react";

type ProductTailleProps = {
  tailleData: Array<{
    name: string;
    price: number;
    productId: string;
    image: string;
    downloadLinks?: string[];
    ficheTechniqueLink?: string;
  }>;
  onQuantityChange: (id: string, quantity: number) => void;
};

export function ProductTaille({ tailleData, onQuantityChange }: ProductTailleProps) {
  const [selectedTailles, setSelectedTailles] = useState<{[key: string]: number}>({});

  const handleQuantityChange = (productId: string, delta: number) => {
    const currentQuantity = selectedTailles[productId] || 0;
    const newQuantity = Math.max(0, currentQuantity + delta);
    
    setSelectedTailles(prev => ({
      ...prev,
      [productId]: newQuantity
    }));
    
    onQuantityChange(productId, newQuantity);
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
        <div className="grid md:grid-cols-2 gap-4 h-[30rem] overflow-y-auto">
          {tailleData.map((taille) => (
            <Card key={taille.name} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                <div className="space-y-1">
                  <CardTitle>{taille.name}</CardTitle>
                  <Badge variant="secondary">${taille.price.toFixed(2)}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <img 
                  src={taille.image} 
                  alt={taille.name} 
                  className="w-full h-48 object-cover rounded-md mb-2" 
                />
                <div className="flex items-center justify-between mb-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuantityChange(taille.productId, -1)}
                  >
                    -
                  </Button>
                  <span>{selectedTailles[taille.productId] || 0}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuantityChange(taille.productId, 1)}
                  >
                    +
                  </Button>
                </div>
                <div className="flex flex-col space-y-2">
                  {taille.downloadLinks && taille.downloadLinks.length > 0 && (
                    taille.downloadLinks!.map((link, index) => (
                      <a 
                        key={index}
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:underline text-xs"
                      >
                        <Download className="h-4 w-4 mr-1" /> 
                        {taille.name} {taille.downloadLinks!.length > 1 ? `${index + 1}` : ''}
                      </a>
                    ))
                  )}
                  {taille.ficheTechniqueLink && (
                    <a 
                      href={taille.ficheTechniqueLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-green-600 hover:underline text-xs"
                    >
                      <FileText className="h-4 w-4 mr-1" /> fiche technique
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}