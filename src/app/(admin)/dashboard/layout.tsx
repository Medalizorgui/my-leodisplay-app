import { Poppins } from "next/font/google";
import Header from "../_components/Header";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
        <Header />
        {children}
    </>
  );
}
