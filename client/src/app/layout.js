
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider} from "@nextui-org/react";
import Navbar from "./components/Navbar/page";
import Footer from "./components/footer/page";
import ReduxProvider from "@/redux/ReduxProvider";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <ReduxProvider>
        
        {children}
        
        </ReduxProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
