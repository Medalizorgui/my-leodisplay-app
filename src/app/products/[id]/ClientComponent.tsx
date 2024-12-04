"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Import useSession for session handling
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductTaille } from "./ProductTaille";
import { ProductBase } from "./ProductBase";
import ImageUploader from "@/app/(admin)/dashboard/orders/_components/ImageUploader";
import AddToCartButton from "@/components/AddToCartButton";
import { useCart } from "@/hooks/use-cart";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

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
  const { data: session } = useSession(); // Get session data
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

  const router = useRouter(); // Initialize useRouter

  const handleLoginClick = () => {
    router.push("/sign-in"); // Redirect to the sign-in page
  };

  return (
    <div className="space-y-6">
      {/* Quantity Selector */}
      <div className="flex items-center space-x-4">
        <label htmlFor="quantity" className="text-sm font-medium">
          Quantite:
        </label>
        <Input
          id="quantity"
          type="number"
          min="1"
          value={selectedOptions.quantity}
          onChange={handleQuantityChange}
          className="w-24"
        />
      </div>
      {/* Type and Barre Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Type de produit:</h3>
          <Select onValueChange={handleTypeSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              {type.map((item, index) => (
                <SelectItem key={`type-${index}-${item}`} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Barre de produit:</h3>
          <Select onValueChange={handleBarreSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a barre" />
            </SelectTrigger>
            <SelectContent>
              {barre.map((item, index) => (
                <SelectItem key={`barre-${index}-${item}`} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Taille Component */}
      {tailleData.length > 0 && (
        <ProductTaille
          tailleData={tailleData}
          onQuantityChange={handleTailleQuantityChange}
        />
      )}

      {/* Product Base Component */}
      {baseData.length > 0 && (
        <ProductBase
          baseData={baseData}
          onQuantityChange={handleBaseQuantityChange}
        />
      )}

      

      {/* Image Uploader */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Telecharger un image</h3>
        <ImageUploader onImageUrlChange={handleImageUpload} />
      </div>

      {/* Conditional Button */}
      <div className="mt-6">
        {isAuthenticated ? (
          <div className="w-full py-3 text-lg font-semibold">
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
          </div>
        ) : (
          <button
            className="bg-primary text-primary-foreground py-3 px-4 rounded-lg hover:bg-primary/90 transition-all duration-200 w-full text-lg font-semibold"
            onClick={handleLoginClick} // Navigate to the sign-in page
          >
            se connecter
          </button>
        )}
      </div>
    </div>
  );
}

