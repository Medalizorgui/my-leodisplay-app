import Image from 'next/image'
import { CartItem } from '@/hooks/use-cart'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/hooks/use-cart'
import { Minus, Plus, Trash2 } from 'lucide-react'

export function CartItemComponent({ item }: { item: CartItem }) {
  const { items, addItem, removeItem } = useCart()

  const calculateItemTotal = () => {
    return item.basePrice * item.quantity +
      item.tailles.reduce((sum, taille) => sum + taille.price * taille.quantity, 0) +
      item.bases.reduce((sum, base) => sum + base.price * base.quantity, 0)
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(item.productId)
    } else {
      // Update the item's quantity while preserving other properties
      const updatedItem = { ...item, quantity: newQuantity }
      
      // Remove the existing item and add the updated version
      removeItem(item.productId)
      addItem(updatedItem)
    }
  }

  return (
    <Card className="mb-4">
      <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
        {item.uploadedImageUrl && (
          <Image
            src={item.uploadedImageUrl}
            alt={item.productName}
            width={100}
            height={100}
            className="rounded-md object-cover"
          />
        )}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{item.productName}</h3>
          {item.type && <p className="text-sm text-gray-600">Type: {item.type}</p>}
          {item.barre && <p className="text-sm text-gray-600">Barre: {item.barre}</p>}
          <p className="text-sm text-gray-600">Base Price: {item.basePrice.toFixed(2)}TND</p>
          
          {item.tailles.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-semibold">Tailles:</p>
              <ul className="list-disc list-inside">
                {item.tailles.map((taille) => (
                  <li key={taille.id} className="text-sm">
                    {taille.name}: {taille.price.toFixed(2)}TND (x{taille.quantity})
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {item.bases.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-semibold">Bases:</p>
              <ul className="list-disc list-inside">
                {item.bases.map((base) => (
                  <li key={base.id} className="text-sm">
                    {base.name}: {base.price.toFixed(2)}TND (x{base.quantity})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <p className="text-lg font-semibold">{calculateItemTotal().toFixed(2)}TND</p>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input 
              type="number" 
              min="1"
              value={item.quantity} 
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              className="w-16 text-center"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button 
              variant="destructive" 
              size="icon" 
              onClick={() => removeItem(item.productId)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}