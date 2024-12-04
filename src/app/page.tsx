import { PrismaClient } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ArrowDownToLine, CheckCircle, Leaf, ChevronRight } from 'lucide-react';
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { PerkCard } from "@/components/perkCard";

const prisma = new PrismaClient();

const fetchProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const perks = [
  {
    name: "Mise en place rapide et facile",
    Icon: ArrowDownToLine,
    description: "D'une façon générale les produits LEO DISPLAY sont conçus pour être transportés, montés et démontés par une seule personne."
  },
  {
    name: "Visuel personnalisable",
    Icon: CheckCircle,
    description: "Tous vos visuels peuvent être traités et imprimés avec des supports dédiés pour chaque besoin et pour chaque support publicitaire."
  },
  {
    name: "Dimension sur-mesure",
    Icon: Leaf,
    description: "À parts les dimensions standard que nous proposons, nous pouvons toutefois réaliser des supports sur-mesure qui s'adaptent à votre espace."
  }
];

export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight" style={{ color: "hsl(47.9, 95.8%, 53.1%)" }}>
                Bienvenue au LeoDisplay
              </h1>
              <p className="text-xl text-gray-600">
                LEO DISPLAY est la première marque tunisienne qui fabrique des supports publicitaires 100% conçus et réalisés en Tunisie avec des normes européennes.
              </p>
              <Button className="text-lg px-6 py-3" style={{ backgroundColor: "hsl(47.9, 95.8%, 53.1%)", color: "#fff" }}>
                Découvrir nos produits <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/gatous.jpg"
                alt="LeoDisplay Showcase"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center" style={{ color: "hsl(47.9, 95.8%, 53.1%)" }}>Nos Produits</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={{
                id: product.id.toString(),
                nom: product.nom,
                description: product.description,
                image: product.image,
              }} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: "hsl(47.9, 95.8%, 53.1%)" }}>Nos Avantages</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((perk) => (
              <PerkCard key={perk.name} perk={perk} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

