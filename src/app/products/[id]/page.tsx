import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import ClientComponent from "./ClientComponent";
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
    return <p>Product not found.</p>;
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
    <div className="container mx-auto px-4 py-8 ">
      <Card className="overflow-hidden shadow-lg rounded-xl">
        <CardContent className="p-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative col-span-1 lg:col-span-2">
              <div className="flex items-center justify-center sticky top-4 h-[400px] md:h-[500px] lg:h-[600px]">
                <Image
                  alt={nom}
                  className="rounded-lg object-cover w-full h-full"
                  src={image || "/placeholder.svg"}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-start space-y-6 lg:col-span-1">
              <h1 className="text-3xl font-bold tracking-tight">{nom}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">{description}</p>
              <div className="text-3xl font-bold text-primary">
                ${parseFloat(prix).toFixed(2)}
              </div>
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
  );
}

