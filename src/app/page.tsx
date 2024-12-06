
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import { ProductSection } from "@/components/ProductSection";
import { AboutUsSection } from "@/components/AboutUsSection";
import { PerksSection } from "@/components/PerkSection";
import { ContactDialog } from "@/components/contactDialog";
import { ChevronRight } from "lucide-react";
import ProductCaller from "@/components/ProductCaller";

const prisma = new PrismaClient();

const fetchProducts = async () => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight text-amber-500">
                Bienvenue au LeoDisplay
              </h1>
              <p className="text-xl text-gray-600">
                LEO DISPLAY est la première marque tunisienne qui fabrique des supports publicitaires 100% conçus et réalisés en Tunisie avec des normes européennes.
              </p>
              <div className="flex space-x-4">
                <Button className="text-lg px-6 py-3 bg-amber-500 text-white hover:bg-amber-600">
                  Découvrir nos produits <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <ContactDialog />
              </div>
            </div>
            <Carousel className="w-full max-w-lg">
              <CarouselContent>
                {products.map((product) => (
                  <CarouselItem key={product.id}>
                    <Card>
                      <Image
                        src={product.image || "/placeholder.jpg"}
                        alt={product.nom}
                        width={500}
                        height={300}
                        className="w-full h-80 object-cover rounded-t-lg"
                      />
                      <CardFooter className="p-4">
                        <p className="text-center w-full">{product.nom}</p>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        <ProductCaller products={products} />
        <AboutUsSection />
        <PerksSection />
      </main>
    </div>
  );
}