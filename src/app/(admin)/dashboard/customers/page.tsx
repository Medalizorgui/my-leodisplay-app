import React from 'react'
import ProductsTable from "./_components/data-table"
import { Customer, PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export default async function page() {
  const allCustemrs = await db.customer.findMany() as Customer[]; 
  return (
    <main className="px-5">
      <ProductsTable data={allCustemrs}/>
    </main>
  )
}
