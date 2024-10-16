import React from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "@/context/globalContext";
import "photoswipe/dist/photoswipe.css";

export const metadata = {
  title: "PropertyPulse | Find The Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rentals.find properties",
};

const MainLayout = ({ children }: any) => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html lang="en">
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default MainLayout;
