import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const SeedData = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const seedDatabase = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('seed-data');
      
      if (error) throw error;

      toast({
        title: "Database seeded successfully!",
        description: `Added ${data.products_count} sample products. Seller account: ${data.seller_email}`,
      });
    } catch (error: any) {
      toast({
        title: "Error seeding database",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Seed Sample Data</CardTitle>
          <CardDescription>
            Add sample products and a seller account to the database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={seedDatabase} className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Seed Database
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            This will create a seller account (seller@arenamarket.com / seller123) and add sample products from all categories.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeedData;
