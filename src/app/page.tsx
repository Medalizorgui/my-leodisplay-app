import { PrismaClient } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";  // Assuming you are using lucide-react for icons
import Link from "next/link";  // Import Link from Next.js


const prisma = new PrismaClient();

// Fetch products directly inside the component (this will run server-side)
const fetchProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

// Perks data
const perks = [
  {
    name: "Mise en place rapide et facile",
    Icon: ArrowDownToLine,
    description: "D’une façon générale les produits LEO DISPLAY sont conçus pour être transportés, montés et démontés par une seule personne."
  },
  {
    name: "Visuel personnalisable",
    Icon: CheckCircle,
    description: "Tous vos visuels peuvent être traités et imprimés avec des supports dédiés pour chaque besoin et pour chaque support publicitaire."
  },
  {
    name: "Dimension sur-mesure",
    Icon: Leaf,
    description: "À parts les dimensions standard que nous proposons, nous pouvons toutefois réaliser des supports sur-mesure qui s’adaptent à votre espace."
  }
];

export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
            <h2 className="text-4xl font-bold mb-4" style={{ color: "hsl(47.9, 95.8%, 53.1%)" }}>Bienvenue au LeoDisplay</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            LEO DISPLAY est la première marque tunisienne qui fabrique des supports publicitaires 100% conçus et réalisés en Tunisie avec des normes européennes.
            Tous nos produits sont conçus et réalisés avec des matériaux de haute qualité.Notre bureau d’étude fait en sorte que nos produits soient faciles à monter et démonter, toute en tenant compte des contraintes de chaque client.
            Notre département PRINT est constitué d’un studio graphique dédié et d’une panoplie de machines de dernière génération et de haute performance, soit en sublimation soit en numérique grand format.
          </p>
            </div>
            <div className="relative h-64 md:h-full">
          <Image
            src="/next.svg"
            alt="Introduction Image"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: "hsl(47.9, 95.8%, 53.1%)" }}>Our Products</h2>
          <div className=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6  flex-col items-center justify-center">
            {products.map((product) => (
              <Card key={product.id} className="flex flex-col border border-gray-200 rounded-lg shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900">{product.nom}</CardTitle>
                  <CardDescription className="text-gray-600">{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <Image
                    src={product.image}
                    alt={product.nom}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </CardContent>
                <CardFooter>
                  <Link href={`./../products/${product.id}`} passHref>
                    <Button className="w-full" style={{ backgroundColor: "hsl(47.9, 95.8%, 53.1%)", color: "#fff" }}>
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Perks Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: "hsl(47.9, 95.8%, 53.1%)" }}>Our Perks</h2>
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div key={perk.name} className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-yellow-200 text-yellow-900">
                    <perk.Icon className="w-1/3 h-1/3" />
                  </div>
                </div>
                <div className="mt-6 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">{perk.name}</h3>
                  <p className="mt-3 text-sm text-gray-600">{perk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
