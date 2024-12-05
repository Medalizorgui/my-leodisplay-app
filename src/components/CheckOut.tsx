'use client'

import { useCart } from "@/hooks/use-cart";
import { CartItemComponent } from './CartItemComponent'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useState } from 'react';
import { toast } from 'sonner'; // Assuming you're using sonner for notifications
import { useSession } from "next-auth/react";

export function Checkout() {
  const {data: session} = useSession()
  const { items: cartItems, clearCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = item.basePrice * item.quantity +
        item.tailles.reduce((tailleSum, taille) => tailleSum + taille.price * taille.quantity, 0) +
        item.bases.reduce((baseSum, base) => baseSum + base.price * base.quantity, 0);
      return total + itemTotal;
    }, 0)
  }

  const handleProceedToPayment = async () => {
    if (cartItems.length === 0) return;

    setIsSubmitting(true);

    try {
      // Create orders for each cart item
      const orderPromises = cartItems.map(async (item) => {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productNom: item.productName,
            qty: item.quantity,
            selectedType: item.type,
            selectedBarre: item.barre,
            selectedBase: item.bases.length > 0 ? item.bases[0].name : '',
            baseQuantity: item.bases.reduce((sum, base) => sum + base.quantity, 0),
            selectedTaille: item.tailles.length > 0 ? item.tailles[0].name : '',
            tailleQuantity: item.tailles.reduce((sum, taille) => sum + taille.quantity, 0),
            status: 'attente',
            image: item.uploadedImageUrl,
            email: session?.user?.email || '', // You might want to get this from user context or input
            name: session?.user?.name || '', // You might want to get this from user context or input
            orderGroupId: item.productId,
          })
        });

        if (!response.ok) {
          throw new Error('Failed to create order');
        }

        return response.json();
      });

      // Wait for all orders to be created
      await Promise.all(orderPromises);

      // Clear the cart
      clearCart();

      // Show success toast
      toast.success('Commande passée avec succès');

      // Redirect to payment or confirmation page
      router.push('/merci');
    } catch (error) {
      console.error('Order creation error:', error);
      toast.error('Échec de la création de la commande');
    } finally {
      setIsSubmitting(false);
    }
  }

  const subtotal = calculateTotal()
  const tax = subtotal * 0.1 // Assuming 10% tax rate
  const total = subtotal + tax

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">Your cart is empty</p>
              </CardContent>
            </Card>
          ) : (
            cartItems.map(item => (
              <CartItemComponent
                key={item.productId}
                item={item}
              />
            ))
          )}
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={handleProceedToPayment}
                disabled={cartItems.length === 0 || isSubmitting}
              >
                {isSubmitting ? 'Traitement...' : 'Passer l\'ordre'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}