import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Menu, X, ShoppingBag, MapPin, Phone } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categories = [
    "Fashion",
    "Electronics", 
    "Foodstuff",
    "Household",
    "Accessories"
  ];

  return (
    <header className="bg-background shadow-elegant border-b sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Arena Market, Oshodi, Lagos</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>+234 123 456 7890</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                Free Delivery in Lagos
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-marketplace-hero rounded-lg flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Arena Market Connect</h1>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div 
              className={`relative transition-all duration-200 ${
                isSearchFocused ? 'scale-105' : ''
              }`}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for products, electronics, fashion..."
                className="pl-10 pr-4 py-3 w-full border-2 transition-colors duration-200"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-4 mt-8">
                <h3 className="font-semibold text-lg">Categories</h3>
                {categories.map((category) => (
                  <Button key={category} variant="ghost" className="justify-start">
                    {category}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline">Sell on Arena</Button>
            <Button className="bg-marketplace-hero border-0">
              Contact Us
            </Button>
          </div>
        </div>

        {/* Categories Navigation */}
        <nav className="hidden md:flex items-center gap-6 mt-4 pt-4 border-t">
          {categories.map((category) => (
            <Button key={category} variant="ghost" className="text-foreground hover:text-primary">
              {category}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;