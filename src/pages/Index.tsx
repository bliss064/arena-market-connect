import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import DeliverySection from "@/components/DeliverySection";
import Footer from "@/components/Footer";
import flyerImage from "@/assets/arena-market-flyer.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Categories />
      <FeaturedProducts />
      
      {/* Marketing Flyer Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Marketing Flyer</h2>
          <div className="flex justify-center">
            <img 
              src={flyerImage} 
              alt="Arena Market Online Marketing Flyer" 
              className="max-w-full h-auto shadow-elegant rounded-lg"
            />
          </div>
        </div>
      </section>
      
      <DeliverySection />
      
      <Footer />
    </div>
  );
};

export default Index;
