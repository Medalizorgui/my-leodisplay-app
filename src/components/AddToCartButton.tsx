import React, { useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { CartItem } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

type AddToCartButtonProps = {
  order: CartItem;
};

const AddToCartButton = ({ order }: AddToCartButtonProps) => {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  const handleAddToCart = () => {
    addItem(order);
    setIsAdding(true);
    router.push("/")
    

    // Set timeout to reset the button state
    setTimeout(() => setIsAdding(false), 2000);
  };

  return (
    <Button
      className="w-full"
      style={{ backgroundColor: "hsl(47.9, 95.8%, 53.1%)", color: "#fff" }}
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      {isAdding ? "Ajout..." : "Ajouter au pannier"}
    </Button>
  );
};

export default AddToCartButton;