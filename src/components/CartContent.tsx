"use client";

import { useState } from "react";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CartContent() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Product 1", price: 19.99, quantity: 2 },
    { id: 2, name: "Product 2", price: 29.99, quantity: 1 },
    { id: 3, name: "Product 3", price: 39.99, quantity: 3 },
  ]);

  // Add item to cart
  const handleAddToCart = (newItem: { id: number; name: string; price: number }) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        // If item exists, increase its quantity
        return prevItems.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If item doesn't exist, add it to the cart
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  // Decrease item quantity
  const handleDecreaseQuantity = (itemId: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item
  const handleRemoveItem = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto py-2">
        <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-medium">{item.name}</span>
                  <span className="ml-2 text-gray-500">${item.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease quantity</span>
                  </Button>
                  <span className="mx-2 w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => handleAddToCart(item)}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 text-red-500"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-lg">${total.toFixed(2)}</span>
        </div>
        <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Checkout
        </Button>
      </div>

      {/* Add to Cart Button */}
      <Button
        className="w-full mt-4"
        style={{
          backgroundColor: "hsl(47.9, 95.8%, 53.1%)",
          color: "#fff",
        }}
        onClick={() =>
          handleAddToCart({ id: 4, name: "New Product", price: 49.99 })
        }
      >
        Add to Cart
      </Button>
    </div>
  );
}
