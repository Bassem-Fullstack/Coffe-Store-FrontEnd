import Navbar from "@/components/Navbar";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "@/components/Footer";
import ReduxProvider from "@/Redux/provider";
import type { Metadata } from "next"
import { Toaster } from "react-hot-toast"


export const metadata: Metadata = {
  title: "Coffe Store",
  description: "Fresh Coffee & Handcrafted Drinks",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
     <body className="flex flex-col min-h-screen">

     <ReduxProvider>


  <Navbar />

  <Toaster position="top-center" /> 
  
  <main className="flex-1"> 


  {children}

  </main>

  <Footer />

</ReduxProvider>

</body>
     
    </html>
  );
}
