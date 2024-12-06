"use client";

import React from 'react'
import { ProductSection } from './ProductSection'


interface Product {
    id: number;
    nom: string;
    description: string;
    image: string;
    price?: number;
  }

const ProductCaller = ({ products }: { products: Product[] }) => {
  return (
    <div>
      <ProductSection products={products}/>
    </div>
  )
}

export default ProductCaller
