"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ImageUploader from '@/app/(admin)/dashboard/orders/_components/ImageUploader'; // Adjust the path if necessary

type ClientComponentProps = {
  type?: string[];
  base?: string[];
  taille?: string[];
  barre?: string[];
};

export default function ClientComponent({
  type,
  base,
  taille,
  barre,
}: ClientComponentProps) {
  const [quantity, setQuantity] = useState(1);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleImageUpload = (url: string) => {
    setUploadedImageUrl(url);
  };

  return (
    <div className="space-y-4">
      {/* Type Selector */}
      {type && type.length > 0 && type[0] !== '' && (
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {type.map((t, index) => (
              <SelectItem key={index} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Base Selector */}
      {base && base.length > 0 && base[0] !== '' && (
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select base" />
          </SelectTrigger>
          <SelectContent>
            {base.map((b, index) => (
              <SelectItem key={index} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Taille Selector */}
      {taille && taille.length > 0 && taille[0] !== '' && (
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select taille" />
          </SelectTrigger>
          <SelectContent>
            {taille.map((t, index) => (
              <SelectItem key={index} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Barre Selector */}
      {barre && barre.length > 0 && barre[0] !== '' && (
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select barre" />
          </SelectTrigger>
          <SelectContent>
            {barre.map((b, index) => (
              <SelectItem key={index} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
        <ImageUploader onImageUrlChange={handleImageUpload || (() => {})} />
        {uploadedImageUrl && (
          <div className="mt-2">
            <p className="text-sm">Uploaded Image URL:</p>
            <p className="text-sm text-blue-600 break-all">{uploadedImageUrl}</p>
          </div>
        )}
      </div>

      {/* Add to Cart Button */}
      <Button
        className="w-full"
        style={{
          backgroundColor: 'hsl(47.9, 95.8%, 53.1%)',
          color: '#fff',
        }}
      >
        Add to Cart
      </Button>
    </div>
  );
}
