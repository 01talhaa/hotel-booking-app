import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModel from "./components/Model/RegisterModel";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModel from "./components/Model/LoginModel";
import getCurrentUser from "./actions/getCurrentUser";
import RentModel from "./components/Model/RentModel";
import SearchModal from "./components/Model/SearchModal";

const font = Nunito({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Airbnb",
  description: "airbnb clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();



  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <RentModel />
          <LoginModel/>
          <RegisterModel/>
          <Navbar currentUser={currentUser}/>
        </ClientOnly>

        <div className="pb-20 pt-28">
        {children}
        </div>
        </body>
    </html>
  );
}
