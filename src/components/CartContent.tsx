"use client";

import React from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function CartContent() {
  const { items, removeItem } = useCart();
  const router = useRouter();

  const total = items.reduce((sum, item) => {
    const itemTotal =
      item.basePrice * item.quantity +
      item.tailles.reduce(
        (tailleSum, taille) => tailleSum + taille.price * taille.quantity,
        0
      ) +
      item.bases.reduce(
        (baseSum, base) => baseSum + base.price * base.quantity,
        0
      );
    return sum + itemTotal;
  }, 0);

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Your Cart</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.productId} className="py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    {item.type && (
                      <p className="text-sm text-gray-500">Type: {item.type}</p>
                    )}
                    {item.barre && (
                      <p className="text-sm text-gray-500">
                        Barre: {item.barre}
                      </p>
                    )}

                    {item.tailles.length > 0 && (
                      <div className="text-sm text-gray-500">
                        Tailles:
                        {item.tailles.map((taille) => (
                          <p key={taille.id}>
                            {taille.name} - Qty: {taille.quantity} ($
                            {taille.price.toFixed(2)})
                          </p>
                        ))}
                      </div>
                    )}

                    {item.bases.length > 0 && (
                      <div className="text-sm text-gray-500">
                        Bases:
                        {item.bases.map((base) => (
                          <p key={base.id}>
                            {base.name} - Qty: {base.quantity} ($
                            {base.price.toFixed(2)})
                          </p>
                        ))}
                      </div>
                    )}

                    {item.uploadedImageUrl && (
                      <Image
                        src={item.uploadedImageUrl}
                        alt={item.productName}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                    )}
                  </div>

                  <div className="flex items-center">
                    <span className="mr-2">Qty: {item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500"
                      onClick={() => handleRemoveItem(item.productId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex justify-between items-center">
          <p className="font-bold">Total:</p>
          <p className="text-xl font-bold">${total.toFixed(2)}</p>
        </div>

        <Button
          className="w-full mt-4 bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleCheckout}
          disabled={items.length === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Checkout
        </Button>
      </CardContent>
    </Card>
  );
}
