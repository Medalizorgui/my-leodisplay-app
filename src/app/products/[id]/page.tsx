import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import ClientComponent from "./ClientComponent"; // Adjust path based on your structure

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

  const { nom, description, image, prix, type, barre, bases, tailles } =
    productData;

  return (
    <div className="container mx-auto px-4 py-8 ">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative">
              <div className="flex items-center justify-center sticky top-4">
                <Image
                  alt={nom}
                  className="rounded-lg object-cover"
                  height={400}
                  src={image || "/placeholder.svg"}
                  style={{
                    aspectRatio: "400/400",
                    objectFit: "cover",
                  }}
                  width={400}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-3xl font-bold">{nom}</h1>
              <p className="text-gray-500 dark:text-gray-400">{description}</p>
              <div className="text-2xl font-bold">
                ${parseFloat(prix).toFixed(2)}
              </div>

              {/* Pass product data to the client-side component */}
              <ClientComponent
                type={type}
                barre={barre}
                base={bases}
                taille={tailles}
                productId={id} // Pass the product ID to the ClientComponent
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
