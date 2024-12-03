'use client'

import { useCart } from "@/hooks/use-cart";
import { CartItemComponent } from './CartItemComponent'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map(item => (
              <CartItemComponent
                key={item.productId}
                item={item}
              />
            ))
          )}
        </div>
        <div className="md:col-span-1">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping:</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Tax:</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between text-xl font-semibold">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <Button 
              className="w-full mt-6"
              onClick={handleProceedToPayment}
              disabled={cartItems.length === 0}
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}