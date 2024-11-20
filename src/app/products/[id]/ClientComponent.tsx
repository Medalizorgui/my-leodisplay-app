"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  return (
    <div className="space-y-2">
      {/* Type Selector */}
      {type && type.length > 0 && (
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
      {base && base.length > 0 && (
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
      {taille && taille.length > 0 && (
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
      {barre && barre.length > 0 && (
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

      <Button className="w-full" style={{ backgroundColor: "hsl(47.9, 95.8%, 53.1%)", color: "#fff" }}>
        Add to Cart
      </Button>
    </div>
  );
}
