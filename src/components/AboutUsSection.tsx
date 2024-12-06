import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Trophy, Rocket } from "lucide-react";

const aboutUsSections = [
  {
    title: "Notre Histoire",
    content: "Fondée en 2010, LeoDisplay est née de la passion de trois amis pour le design et la publicité. Nous avons commencé dans un petit atelier à Tunis, et aujourd'hui, nous sommes fiers d'être la première marque tunisienne de supports publicitaires aux normes européennes.",
    icon: Users
  },
  {
    title: "Notre Mission",
    content: "Chez LeoDisplay, notre mission est de fournir des solutions publicitaires innovantes et de haute qualité, tout en promouvant le savoir-faire tunisien. Nous nous efforçons de combiner créativité, technologie et durabilité dans chacun de nos produits.",
    icon: Trophy
  },
  {
    title: "Notre Avenir",
    content: "Nous regardons vers l'avenir avec optimisme et ambition. Notre objectif est de devenir un leader régional dans le domaine des supports publicitaires, tout en continuant à innover et à soutenir l'économie locale. Rejoignez-nous dans cette aventure passionnante !",
    icon: Rocket
  }
];

export function AboutUsSection() {
  return (
    <section className="mb-16">
      <h2 className="text-4xl font-bold mb-8 text-center text-amber-500">À Propos de Nous</h2>
      <Tabs defaultValue="notre-histoire" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {aboutUsSections.map((section) => (
            <TabsTrigger key={section.title} value={section.title.toLowerCase().replace(' ', '-')}>
              {section.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {aboutUsSections.map((section) => (
          <TabsContent key={section.title} value={section.title.toLowerCase().replace(' ', '-')}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <section.icon className="mr-2 h-6 w-6 text-amber-500" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{section.content}</p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}