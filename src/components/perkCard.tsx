import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type LucideIcon } from 'lucide-react';

interface PerkCardProps {
  perk: {
    name: string;
    Icon: LucideIcon;
    description: string;
  };
}

export function PerkCard({ perk }: PerkCardProps) {
  return (
    <Card className="text-center transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-yellow-100">
          <perk.Icon className="h-8 w-8 text-yellow-600" />
        </div>
        <CardTitle className="mt-4 text-lg font-semibold text-gray-900">{perk.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-gray-600">{perk.description}</CardDescription>
      </CardContent>
    </Card>
  );
}

