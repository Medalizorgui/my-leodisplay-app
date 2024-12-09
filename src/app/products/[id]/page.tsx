import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, Tag, ShoppingBag } from "lucide-react";
import ClientComponentWrapper from "./ClientComponentCaller";

// Initialize Prisma
const prisma = new PrismaClient();

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { id: true },
  });
  return products.map((product) => ({ id: product.id.toString() }));
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const productData = await prisma.product.findUnique({
    where: { id: parseInt(id, 10) },
    include: { bases: true, tailles: true },
  });

  if (!productData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="flex justify-center mb-4">
              <Eye className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Produit Non Trouvé</h2>
            <p className="text-gray-600">
              Le produit que vous recherchez n'existe pas ou a été supprimé.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { 
    nom, 
    description, 
    image, 
    prix, 
    type, 
    barre, 
    bases, 
    tailles 
  } = productData;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Card className="w-full shadow-xl rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
              {/* Product Image */}
              <div className="relative col-span-1 lg:col-span-2 rounded-xl overflow-hidden">
                <div className="aspect-square md:aspect-video lg:aspect-[4/3] relative">
                  <Image
                    alt={nom}
                    src={image || "/placeholder.svg"}
                    fill
                    priority
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </div>
                {/* Product Badges */}
                
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-between space-y-6 lg:col-span-1">
                <div>
                  <h1 className="text-3xl font-bold mb-4 tracking-tight text-gray-900">
                    {nom}
                  </h1>
                  
                  <ScrollArea className="h-16 pr-4">
                    <p className="text-gray-600 leading-relaxed">
                      {description}
                    </p>
                  </ScrollArea>

                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-primary">
                      ${parseFloat(prix).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Configuration Component */}
                <ClientComponentWrapper
                  productId={id}
                  productName={nom}
                  productPrice={parseFloat(prix)}
                  type={type}
                  barre={barre}
                  base={bases}
                  taille={tailles}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}