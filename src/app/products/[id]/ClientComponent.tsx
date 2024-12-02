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
import { ProductTaille } from "./ProductTaille"; // Import ProductTaille component
import { ProductBase } from "./ProductBase"; // Import ProductBase component
import ImageUploader from "@/app/(admin)/dashboard/orders/_components/ImageUploader";

type ClientComponentProps = {
  productId: string;
  type: any[]; // Add type as a prop
  barre: any[]; // Add barre as a prop
  base: any[];
  taille: any[];
};

export default function ClientComponent({
  productId,
  type,
  barre,
  base,
  taille,
}: ClientComponentProps) {
  const [tailleData, setTailleData] = useState<any[]>([]);
  const [baseData, setBaseData] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  // Fetch tailles and base data based on productId
  useEffect(() => {
    
    const fetchData = async () => {
      // Fetch tailles
      const tailleResponse = await fetch(`/api/taille?productId=${productId}`);
      const tailleData = await tailleResponse.json();
      console.log("this the taille data",tailleData);
      setTailleData(tailleData);

      // Fetch base data (if applicable)
      const baseResponse = await fetch(`/api/base?productId=${productId}`); // Assuming the API exists
      const baseData = await baseResponse.json();
      console.log("this the base data", baseData);
      setBaseData(baseData);
    };

    fetchData();
  }, [productId]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleImageUpload = (url: string) => {
    setUploadedImageUrl(url);
  };

  return (
    <div className="space-y-4">
      {/* Type and Barre data (display them if needed) */}
      <div>
        <h3 className="text-sm font-medium">Product Type:</h3>
        <Select>
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

      <div>
        <h3 className="text-sm font-medium">Product Barre:</h3>
        <Select>
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
        <ProductTaille tailleData={tailleData} />
      )}

      {/* Product Base Component */}
      {baseData.length > 0 && (
        <ProductBase baseData={baseData} />
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
          value={quantity}
          onChange={handleQuantityChange}
          className="w-20"
        />
      </div>

      {/* Image Uploader */}
      <div>
        <h3 className="text-sm font-medium mb-2">Upload Image</h3>
        {/* Image uploader logic */}
        <ImageUploader onImageUrlChange={handleImageUpload} />
        {uploadedImageUrl && (
          <div className="mt-2">
            <p className="text-sm">Uploaded Image URL:</p>
            <p className="text-sm text-blue-600 break-all">
              {uploadedImageUrl}
            </p>
          </div>
        )}
      </div>

      

      {/* Add to Cart Button */}
      <Button
        className="w-full"
        style={{ backgroundColor: "hsl(47.9, 95.8%, 53.1%)", color: "#fff" }}
      >
        Add to Cart
      </Button>
    </div>
  );
}
