import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook } from 'lucide-react';

export function Footer() {
  return (
    <div>
    <footer className="py-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-secondary text-secondary-foreground text-sm mt-3">
      <div className="flex items-center px-8 py-6">
        <h2 className="w-full text-2xl tracking-wide text-secondary-foreground">
          Nous sommes toujours à la recherche de nouveaux partenaires!
        </h2>
      </div>

      <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row justify-between gap-8 md:gap-24">
        <ContactInfo
          title="S3P Distribution Tunis"
          email="s3ptunis.contact@gmail.com"
          tel="+216 58 402 416"
          address="21 Cité ennour, 2080 Ariana, Tunisie"
        />
        <ContactInfo
          title="S3P Distribution Sousse"
          email="s3p.contact@gnet.tn"
          tel="+216 58 306 649"
          address="9 Avenue de la Cité Olympique 4000 Sousse, Tunisie"
        />
        <ContactInfo
          title="S3P Distribution Sfax"
          email="S3p.sfax@gnet.tn"
          tel="+216 56 114 500"
          address="Z.I Poudrière 1, Rue 13 Aout 5000 Sfax, Tunisie"
        />
      </div>

      
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        <div className="text-2xl font-bold">LOGO</div>
        <div className="text-primary">
          <Facebook size={24} />
        </div>
        <div className="uppercase">Vortrgdfgfgsg</div>
      </div>
    </footer>
    </div>
  );
  
}

interface ContactInfoProps {
  title: string;
  email: string;
  tel: string;
  address: string;
}

function ContactInfo({ title, email, tel, address }: ContactInfoProps) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col">
      <h3 className="text-2xl tracking-wide mb-2 text-secondary-foreground">{title}</h3>
      <div className="flex flex-col gap-1">
        <span className="font-semibold block text-secondary-foreground">E-mail:</span>
        <span className="block">{email}</span>
        <span className="font-semibold block text-secondary-foreground">Tel:</span>
        <span className="block">{tel}</span>
        <span className="font-semibold block text-secondary-foreground">Adresse:</span>
        <span className="block">{address}</span>
      </div>
    </div>
  );
  
}


