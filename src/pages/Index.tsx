import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import DeliverySection from "@/components/DeliverySection";
import BusinessModel from "@/components/BusinessModel";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <DeliverySection />
      <BusinessModel />
      <Footer />
    </div>
  );
};

export default Index;
