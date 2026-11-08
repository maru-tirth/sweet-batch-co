import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import ChocolateCollection from "@/components/ChocolateCollection";
import ModakCollection from "@/components/ModakCollection";
import CustomOrders from "@/components/CustomOrders";
import OrderingSection from "@/components/OrderingSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BackToTop from "@/components/BackToTop";

export default function HomePage() {
  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <OurStory />
        <ChocolateCollection />
        <ModakCollection />
        <CustomOrders />
        <OrderingSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </>
  );
}
