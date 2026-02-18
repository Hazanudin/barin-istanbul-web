"use client";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProductGrid />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
