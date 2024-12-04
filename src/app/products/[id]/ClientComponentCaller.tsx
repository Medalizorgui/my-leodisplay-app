"use client";

import { SessionProvider } from "next-auth/react";
import ClientComponent from "./ClientComponent";

type WrapperProps = {
  productId: string;
  productName: string;
  productPrice: number;
  type: any[];
  barre: any[];
  base: any[];
  taille: any[];
};

export default function ClientComponentWrapper(props: WrapperProps) {
  return (
    <SessionProvider>
      <ClientComponent {...props} />
    </SessionProvider>
  );
}
