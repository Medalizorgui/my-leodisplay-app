import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: string;
    nom: string;
    description: string;
    image: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.image}
          alt={product.nom}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-110"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">{product.nom}</CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-2">{product.description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        <Link href={`/products/${product.id}`} passHref className="w-full">
          <Button className="w-full transition-colors duration-300" 
                  style={{ backgroundColor: "hsl(47.9, 95.8%, 53.1%)", color: "#fff" }}
                  variant="outline">
            En savoir plus
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

