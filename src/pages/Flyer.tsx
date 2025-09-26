import flyerImage from "@/assets/arena-market-flyer.jpg";

const Flyer = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Arena Market Online - Marketing Flyer</h1>
          <p className="text-muted-foreground">Professional marketing material for Arena Market Online</p>
        </div>
        
        <div className="bg-card rounded-lg shadow-elegant p-8">
          <img 
            src={flyerImage} 
            alt="Arena Market Online Marketing Flyer - Shop from home, trusted vendors, fast delivery in Lagos Nigeria" 
            className="w-full h-auto rounded-lg shadow-product"
          />
          
          <div className="mt-8 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-foreground">Print Ready</h3>
                <p className="text-sm text-muted-foreground">High resolution design suitable for printing</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-foreground">Digital Use</h3>
                <p className="text-sm text-muted-foreground">Optimized for social media and online marketing</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-foreground">Brand Compliant</h3>
                <p className="text-sm text-muted-foreground">Follows Arena Market brand guidelines</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flyer;