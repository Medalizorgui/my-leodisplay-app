import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";

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

export function PerksSection() {
  return (
    <section className="mb-16">
      <h2 className="text-4xl font-bold mb-12 text-center text-amber-500">Nos Avantages</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {perks.map((perk) => (
          <Card key={perk.name} className="hover:shadow-lg transition-all duration-300 group">
            <CardHeader>
              <div className="flex items-center">
                <perk.Icon className="h-8 w-8 mr-4 text-amber-500" />
                <CardTitle>{perk.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p>{perk.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}