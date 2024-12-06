"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  nom: string;
  description: string;
  image: string;
  price?: number;
}

export function ProductSection({ products }: { products: Product[] }) {
  const router = useRouter();

  const handleQuoteRequest = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  return (
    <section className="mb-16">
      <h2 className="text-4xl font-bold mb-8 text-center text-amber-500">Nos Produits</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-all duration-300 group">
            <CardHeader>
              <Image
                src={product.image || "/placeholder.jpg"}
                alt={product.nom}
                width={400}
                height={250}
                className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform"
              />
              <CardTitle className="text-xl mt-2">{product.nom}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{product.description}</CardDescription>
              <div className="flex justify-between items-center mt-4">
                {product.price && (
                  <Badge variant="secondary">{product.price.toFixed(2)} €</Badge>
                )}
                <Button onClick={() => handleQuoteRequest(product.id)} variant="outline">
                  Voir Produit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}