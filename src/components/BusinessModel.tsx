import { Store, ShoppingCart, Truck, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const BusinessModel = () => {
  const benefits = [
    {
      icon: Store,
      title: "Sellers list products free",
      description: "No upfront costs for vendors to showcase their products"
    },
    {
      icon: ShoppingCart,
      title: "Buyers shop from home",
      description: "Convenient online shopping experience for customers"
    },
    {
      icon: Truck,
      title: "U&C handles delivery",
      description: "Professional logistics partner ensures reliable delivery"
    },
    {
      icon: TrendingUp,
      title: "Woobs earns 5–10% commission per transaction",
      description: "Sustainable business model with fair commission structure"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Woobs Benefits
            </h2>
            <p className="text-xl text-muted-foreground">
              A win-win ecosystem for sellers, buyers, and our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2 hover:border-primary/20 transition-colors duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessModel;