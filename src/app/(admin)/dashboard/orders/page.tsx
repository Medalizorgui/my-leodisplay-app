import React from 'react'
import ProductsTable from './_components/data-table'
import { Order, PrismaClient } from '@prisma/client'

const db = new PrismaClient();

export default async function page() {
  const allOrders = await db.order.findMany() as Order[];
  const formattedProducts = allOrders.map(product => ({
    ...product,
    
  })) 
  return (
    <main className="px-5">
      
      <ProductsTable 
      data={formattedProducts}/>
    </main>
  )
}
