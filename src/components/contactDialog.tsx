import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-lg px-6 py-3">
          Nous Contacter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contactez-nous</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-amber-500" />
            <span>contact@leodisplay.tn</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-amber-500" />
            <span>+216 XX XX XX XX</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-amber-500" />
            <span>Tunis, Tunisie</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}