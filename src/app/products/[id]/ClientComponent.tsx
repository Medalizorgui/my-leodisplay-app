"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type BaseSelection = {
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
  // Comprehensive state to track all product selections
  const [selectedOptions, setSelectedOptions] = useState({
    productId: productId,
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

  // Fetch tailles and base data based on productId
  useEffect(() => {
    const fetchData = async () => {
      // Fetch tailles
      const tailleResponse = await fetch(`/api/taille?productId=${productId}`);
      const tailleData = await tailleResponse.json();
      setTailleData(tailleData);

      // Fetch base data
      const baseResponse = await fetch(`/api/base?productId=${productId}`);
      const baseData = await baseResponse.json();
      setBaseData(baseData);
    };

    fetchData();
  }, [productId]);

  // Handle taille quantity changes
  const handleTailleQuantityChange = (tailleId: string, quantity: number) => {
    setSelectedOptions((prev) => {
      // Find the taille in the existing selections
      const existingTailleIndex = prev.tailles.findIndex(
        (t) => t.id === tailleId
      );

      let updatedTailles = [...prev.tailles];

      if (existingTailleIndex !== -1) {
        // If taille exists, update its quantity
        if (quantity > 0) {
          updatedTailles[existingTailleIndex] = {
            ...updatedTailles[existingTailleIndex],
            quantity,
          };
        } else {
          // Remove taille if quantity is 0
          updatedTailles = updatedTailles.filter((t) => t.id !== tailleId);
        }
      } else if (quantity > 0) {
        // If taille doesn't exist and quantity > 0, add it
        const tailleDetails = tailleData.find((t) => t.id === tailleId);
        if (tailleDetails) {
          updatedTailles.push({
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

  const handleAddToCart = () => {
    // Validate required selections
    if (!selectedOptions.type || !selectedOptions.barre) {
      alert("Please select a type and barre before adding to cart");
      return;
    }

    // Prepare cart item
    const cartItem = {
      productId: selectedOptions.productId,
      productName: selectedOptions.productName,
      basePrice: selectedOptions.basePrice,
      type: selectedOptions.type,
      barre: selectedOptions.barre,
      tailles: selectedOptions.tailles,
      bases: selectedOptions.bases,
      quantity: selectedOptions.quantity,
      uploadedImageUrl: selectedOptions.uploadedImageUrl,
    };

    // Add to cart
    addItem(cartItem);

    // Optional: Reset form or show confirmation
    alert(
      `${selectedOptions.quantity} ${selectedOptions.productName} added to cart`
    );
  };

  // Handle base quantity changes
  const handleBaseQuantityChange = (baseId: string, quantity: number) => {
    setSelectedOptions((prev) => {
      // Find the base in the existing selections
      const existingBaseIndex = prev.bases.findIndex((b) => b.id === baseId);

      let updatedBases = [...prev.bases];

      if (existingBaseIndex !== -1) {
        // If base exists, update its quantity
        if (quantity > 0) {
          updatedBases[existingBaseIndex] = {
            ...updatedBases[existingBaseIndex],
            quantity,
          };
        } else {
          // Remove base if quantity is 0
          updatedBases = updatedBases.filter((b) => b.id !== baseId);
        }
      } else if (quantity > 0) {
        // If base doesn't exist and quantity > 0, add it
        const baseDetails = baseData.find((b) => b.id === baseId);
        if (baseDetails) {
          updatedBases.push({
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

  // Handle type selection
  const handleTypeSelect = (selectedType: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      type: selectedType,
    }));
  };

  // Handle barre selection
  const handleBarreSelect = (selectedBarre: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      barre: selectedBarre,
    }));
  };

  // Handle main quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSelectedOptions((prev) => ({
      ...prev,
      quantity: isNaN(value) || value < 1 ? 1 : value,
    }));
  };

  // Handle image upload
  const handleImageUpload = (url: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      uploadedImageUrl: url,
    }));
  };

  // Optional: Log selected options (you can remove this in production)
  useEffect(() => {
    console.log("Selected Options:", selectedOptions);
  }, [selectedOptions]);

  return (
    <div className="space-y-4">
      {/* Type Selector */}
      <div>
        <h3 className="text-sm font-medium">Product Type:</h3>
        <Select onValueChange={handleTypeSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            {type.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Barre Selector */}
      <div>
        <h3 className="text-sm font-medium">Product Barre:</h3>
        <Select onValueChange={handleBarreSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select a barre" />
          </SelectTrigger>
          <SelectContent>
            {barre.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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

      {/* Quantity Selector */}
      <div className="flex items-center space-x-2">
        <label htmlFor="quantity" className="text-sm font-medium">
          Quantity:
        </label>
        <Input
          id="quantity"
          type="number"
          min="1"
          value={selectedOptions.quantity}
          onChange={handleQuantityChange}
          className="w-20"
        />
      </div>

      {/* Image Uploader */}
      <div>
        <h3 className="text-sm font-medium mb-2">Upload Image</h3>
        <ImageUploader onImageUrlChange={handleImageUpload} />
        {selectedOptions.uploadedImageUrl && (
          <div className="mt-2">
            <p className="text-sm">Uploaded Image URL:</p>
            <p className="text-sm text-blue-600 break-all">
              {selectedOptions.uploadedImageUrl}
            </p>
          </div>
        )}
      </div>

      {/* Add to Cart Button */}
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
  );
}
