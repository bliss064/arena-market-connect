import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Shield, Truck } from "lucide-react";
import heroImage from "@/assets/hero-marketplace.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-2xl">
          {/* Badge */}
          <Badge className="mb-6 bg-accent text-accent-foreground">
            🇳🇬 Nigeria's Growing Marketplace
          </Badge>
          
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Shop Arena Market 
            <span className="text-accent"> Online</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Your favorite Arena Market vendors now deliver directly to you. 
            Fresh products, trusted sellers, same great prices.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4"
            >
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-4"
            >
              Become a Seller
            </Button>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <Star className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold">Trusted Vendors</p>
                <p className="text-sm text-white/80">Verified Arena sellers</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <Truck className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold">Fast Delivery</p>
                <p className="text-sm text-white/80">Same day in Lagos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold">Pay Safely</p>
                <p className="text-sm text-white/80">Pay on delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-12 fill-background">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;