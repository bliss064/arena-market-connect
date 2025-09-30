import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  MapPin, 
  Phone, 
  Mail, 
  ShoppingBag,
  Clock,
  Shield,
  Truck,
  CreditCard
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="bg-marketplace-hero">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Stay Updated with Arena Market Online
            </h3>
            <p className="text-white/90 mb-6">
              Get notified about new products, special offers, and exclusive deals from your favorite vendors.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email address" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h4 className="text-xl font-bold">Arena Market</h4>
                <p className="text-sm text-primary-foreground/80">Online</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Bringing Arena Market's trusted vendors directly to your doorstep. 
              Fresh products, fair prices, reliable delivery across Lagos.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Fashion</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Electronics</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Foodstuff</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Household</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Accessories</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">All Categories</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">How to Order</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Delivery Info</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Return Policy</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Payment Methods</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Track Order</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Arena Market</p>
                  <p className="text-primary-foreground/80 text-sm">Oshodi, Lagos, Nigeria</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <div>
                  <p className="font-medium">+234 123 456 7890</p>
                  <p className="text-primary-foreground/80 text-sm">Customer Support</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <div>
                  <p className="font-medium">support@arenamarketonline.ng</p>
                  <p className="text-primary-foreground/80 text-sm">Email Support</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-accent flex-shrink-0" />
                <div>
                  <p className="font-medium">Mon - Sat: 8AM - 8PM</p>
                  <p className="text-primary-foreground/80 text-sm">Business Hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        {/* Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
              <Truck className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="font-semibold">Fast Delivery</p>
              <p className="text-sm text-primary-foreground/80">Same day delivery in Lagos</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="font-semibold">Secure Shopping</p>
              <p className="text-sm text-primary-foreground/80">Trusted vendors & safe payments</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="font-semibold">Flexible Payment</p>
              <p className="text-sm text-primary-foreground/80">Pay on delivery or transfer</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/80 text-sm">
            Arena Market Online – Bringing Arena sellers closer to buyers.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Cookies</a>
          </div>
        </div>

        <Separator className="my-6 bg-primary-foreground/20" />

        {/* Attribution */}
        <div className="text-center">
          <p className="text-primary-foreground/60 text-xs">
            Powered by Woobs Resources (by Blessing .O. Nosakhare, NYSC IT Assistant)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;