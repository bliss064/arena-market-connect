import { Truck, Shield, Clock } from "lucide-react";

const DeliverySection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Truck className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Reliable Delivery Service
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Every order is fulfilled by U&C Logistics for safe and fast delivery across Lagos.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Safe Handling</h3>
              <p className="text-muted-foreground">Your orders are handled with care from pickup to delivery</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">Quick and efficient delivery throughout Lagos</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Tracked Orders</h3>
              <p className="text-muted-foreground">Real-time tracking for peace of mind</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;