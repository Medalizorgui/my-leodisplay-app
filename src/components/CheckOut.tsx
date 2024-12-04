'use client'

import { useCart } from "@/hooks/use-cart";
import { CartItemComponent } from './CartItemComponent'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function Checkout() {
  const { items: cartItems } = useCart()
  const router = useRouter()

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = item.basePrice * item.quantity +
        item.tailles.reduce((tailleSum, taille) => tailleSum + taille.price * taille.quantity, 0) +
        item.bases.reduce((baseSum, base) => baseSum + base.price * base.quantity, 0);
      return total + itemTotal;
    }, 0)
  }

  const handleProceedToPayment = () => {
    // Add any pre-payment logic here
    router.push('/payment')
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
                disabled={cartItems.length === 0}
              >
                Proceed to Payment
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

