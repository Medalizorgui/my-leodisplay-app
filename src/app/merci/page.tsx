import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MerciPage() {
  return (
    <div className='bg-gray-200 w-full h-full'>
    <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-screen bg-gray-200 ">
      <Card className="max-w-md w-full text-center">
        <CardContent className="p-8 space-y-6">
          <div className="flex justify-center mb-4">
            <CheckCircle2 
              size={80} 
              className="text-green-500 animate-bounce" 
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Merci pour votre commande !</h1>
          <p className="text-muted-foreground">
            Votre commande a été reçue avec succès. 
            Nous travaillons déjà sur sa préparation avec beaucoup d'attention.
          </p>
          <div className="space-y-4">
            
            <div className="flex flex-col space-y-3">
              <Link href="/">
                <Button className="w-full">
                Retour à l'accueil
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}