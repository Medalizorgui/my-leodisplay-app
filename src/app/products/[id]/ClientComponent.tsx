"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ProductTaille } from "./ProductTaille";
import { ProductBase } from "./ProductBase";
import ImageUploader from "@/app/(admin)/dashboard/orders/_components/ImageUploader";
import AddToCartButton from "@/components/AddToCartButton";
import { useCart } from "@/hooks/use-cart";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { AlertCircle, BoxSelect, Image, ShoppingCart, Tag } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type ClientComponentProps = {
  productId: string;
  productName: string;
  productPrice: number;
  type: any[];
  barre: any[];
  base: any[];
  taille: any[];
};

type TailleSelection = {
  uniqueId: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type BaseSelection = {
  uniqueId: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function ClientComponent({
  productId,
  productName,
  productPrice,
  type,
  barre,
  base,
  taille,
}: ClientComponentProps) {
  const { addItem } = useCart();
  const { data: session } = useSession();
  const isAuthenticated = !!session;

  const [selectedOptions, setSelectedOptions] = useState({
    productId: `${productId}-${uuidv4()}`,
    productName: productName,
    basePrice: productPrice,
    type: null as string | null,
    barre: null as string | null,
    tailles: [] as TailleSelection[],
    bases: [] as BaseSelection[],
    quantity: 1,
    uploadedImageUrl: "" as string,
  });

  const [tailleData, setTailleData] = useState<any[]>([]);
  const [baseData, setBaseData] = useState<any[]>([]);
  const [isConfigComplete, setIsConfigComplete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const tailleResponse = await fetch(`/api/taille?productId=${productId}`);
      const tailleData = await tailleResponse.json();
      setTailleData(tailleData);

      const baseResponse = await fetch(`/api/base?productId=${productId}`);
      const baseData = await baseResponse.json();
      setBaseData(baseData);
    };

    fetchData();
  }, [productId]);

  // Existing handler methods remain the same as in the original component

  const handleTailleQuantityChange = (tailleId: string, quantity: number) => {
    setSelectedOptions((prev) => {
      const existingTailleIndex = prev.tailles.findIndex(
        (t) => t.id === tailleId
      );

      let updatedTailles = [...prev.tailles];

      if (existingTailleIndex !== -1) {
        if (quantity > 0) {
          updatedTailles[existingTailleIndex] = {
            ...updatedTailles[existingTailleIndex],
            quantity,
          };
        } else {
          updatedTailles = updatedTailles.filter((t) => t.id !== tailleId);
        }
      } else if (quantity > 0) {
        const tailleDetails = tailleData.find((t) => t.id === tailleId);
        if (tailleDetails) {
          updatedTailles.push({
            uniqueId: `${tailleId}-${uuidv4()}`,
            id: tailleId,
            name: tailleDetails.name,
            price: tailleDetails.price,
            quantity,
          });
        }
      }

      return {
        ...prev,
        tailles: updatedTailles,
      };
    });
  };

  const handleBaseQuantityChange = (baseId: string, quantity: number) => {
    setSelectedOptions((prev) => {
      const existingBaseIndex = prev.bases.findIndex((b) => b.id === baseId);

      let updatedBases = [...prev.bases];

      if (existingBaseIndex !== -1) {
        if (quantity > 0) {
          updatedBases[existingBaseIndex] = {
            ...updatedBases[existingBaseIndex],
            quantity,
          };
        } else {
          updatedBases = updatedBases.filter((b) => b.id !== baseId);
        }
      } else if (quantity > 0) {
        const baseDetails = baseData.find((b) => b.id === baseId);
        if (baseDetails) {
          updatedBases.push({
            uniqueId: `${baseId}-${uuidv4()}`,
            id: baseId,
            name: baseDetails.name,
            price: baseDetails.price,
            quantity,
          });
        }
      }

      return {
        ...prev,
        bases: updatedBases,
      };
    });
  };

  const handleTypeSelect = (selectedType: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      type: selectedType,
    }));
  };

  const handleBarreSelect = (selectedBarre: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      barre: selectedBarre,
    }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSelectedOptions((prev) => ({
      ...prev,
      quantity: isNaN(value) || value < 1 ? 1 : value,
    }));
  };

  const handleImageUpload = (url: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      uploadedImageUrl: url,
    }));
  };

  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/sign-in");
  };

  // Validation logic
  useEffect(() => {
    const isComplete =
      selectedOptions.type !== null &&
      selectedOptions.barre !== null &&
      selectedOptions.tailles.length > 0 &&
      selectedOptions.bases.length > 0;
    setIsConfigComplete(isComplete);
  }, [selectedOptions]);

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{productName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quantity Selector */}
        <div className="space-y-2">
          <Label>Quantite</Label>
          <Input
            type="number"
            min="1"
            value={selectedOptions.quantity}
            onChange={handleQuantityChange}
            className="w-24"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Type Select */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Tag className="w-4 h-4" /> Type de produit
            </Label>
            <Select onValueChange={handleTypeSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectGroup>
                  <SelectLabel>Types de Produits</SelectLabel>
                  {type.map((item, index) => (
                    <SelectItem
                      key={`type-${index}-${item}`}
                      value={item}
                      className="block w-full text-left pl-2 py-1"
                    >
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Barre Select */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <BoxSelect className="w-4 h-4" /> Barre de produit
            </Label>
            <Select onValueChange={handleBarreSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner une barre" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectGroup>
                  <SelectLabel>Types de Barres</SelectLabel>
                  {barre.map((item, index) => (
                    <SelectItem
                      key={`barre-${index}-${item}`}
                      value={item}
                      className="block w-full text-left pl-2 py-1"
                    >
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Taille Component */}
        {tailleData.length > 0 && (
          <div className="space-y-2">
            <Label>Tailles</Label>
            <ProductTaille
              tailleData={tailleData}
              onQuantityChange={handleTailleQuantityChange}
            />
          </div>
        )}

        {/* Product Base Component */}
        {baseData.length > 0 && (
          <div className="space-y-2">
            <Label>Bases</Label>
            <ProductBase
              baseData={baseData}
              onQuantityChange={handleBaseQuantityChange}
            />
          </div>
        )}

        {/* Image Uploader */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Image className="w-4 h-4" /> Telecharger une image
          </Label>
          <ImageUploader onImageUrlChange={handleImageUpload} />
        </div>
        {/* Conditional Button */}
        <div className="mt-6">
          {isAuthenticated ? (
            <AddToCartButton
              order={{
                productId: selectedOptions.productId,
                productName: selectedOptions.productName,
                basePrice: selectedOptions.basePrice,
                type: selectedOptions.type,
                barre: selectedOptions.barre,
                tailles: selectedOptions.tailles,
                bases: selectedOptions.bases,
                quantity: selectedOptions.quantity,
                uploadedImageUrl: selectedOptions.uploadedImageUrl,
              }}
            />
          ) : (
            <Button
              onClick={handleLoginClick}
              className="w-full"
              variant="default"
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Se Connecter
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
