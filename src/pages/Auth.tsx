import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { emailSchema, passwordSchema, fullNameSchema, getSafeErrorMessage } from "@/lib/validation";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get("mode");
    const roleParam = params.get("role");
    if (mode === "signup") setIsLogin(false);
    if (roleParam === "buyer" || roleParam === "seller") setRole(roleParam as "buyer" | "seller");
  }, [location.search]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate inputs
      const validatedEmail = emailSchema.parse(email);
      const validatedPassword = passwordSchema.parse(password);
      const validatedFullName = fullNameSchema.parse(fullName);

      const { data, error } = await supabase.auth.signUp({
        email: validatedEmail,
        password: validatedPassword,
        options: {
          data: {
            full_name: validatedFullName,
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;

      if (data.user) {
        // Update user profile with full name
        const { error: profileError } = await supabase
          .from("profiles")
          .update({ full_name: validatedFullName })
          .eq("id", data.user.id);

        if (profileError) {
          console.error("Error updating profile");
        }

        // Assign role to user in user_roles table
        const { error: roleError } = await supabase
          .from("user_roles")
          .insert({
            user_id: data.user.id,
            role: role,
          });

        if (roleError) {
          console.error("Error assigning role");
        }

        toast({
          title: "Account created!",
          description: "Welcome to Arena Marketplace.",
        });
      }
    } catch (error: any) {
      // Handle validation errors
      if (error.issues) {
        toast({
          title: "Validation Error",
          description: error.issues[0]?.message || "Please check your inputs",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: getSafeErrorMessage(error),
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate inputs
      const validatedEmail = emailSchema.parse(email);
      const validatedPassword = passwordSchema.parse(password);

      const { error } = await supabase.auth.signInWithPassword({
        email: validatedEmail,
        password: validatedPassword,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
      // Handle validation errors
      if (error.issues) {
        toast({
          title: "Validation Error",
          description: error.issues[0]?.message || "Please check your inputs",
          variant: "destructive",
        });
      } else {
        const errorMessage = error.message === "Invalid login credentials" 
          ? "Invalid email or password. Don't have an account? Sign up below."
          : getSafeErrorMessage(error);
        
        toast({
          title: "Sign In Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate email
      const validatedEmail = emailSchema.parse(email);

      const { error } = await supabase.auth.resetPasswordForEmail(validatedEmail, {
        redirectTo: `${window.location.origin}/auth?resetPassword=true`,
      });

      if (error) throw error;

      toast({
        title: "Password reset email sent",
        description: "Please check your email for a password reset link.",
      });
      setIsForgotPassword(false);
    } catch (error: any) {
      // Handle validation errors
      if (error.issues) {
        toast({
          title: "Validation Error",
          description: error.issues[0]?.message || "Please enter a valid email",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: getSafeErrorMessage(error),
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (window.history.length > 1) navigate(-1);
                else navigate("/");
              }}
              aria-label="Go back to home"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <CardTitle>
              {isForgotPassword ? "Reset Password" : isLogin ? "Sign In" : "Create Account"}
            </CardTitle>
          </div>
          <CardDescription>
            {isForgotPassword
              ? "Enter your email to receive a password reset link"
              : isLogin
              ? "Welcome back to Arena Marketplace"
              : "Join Arena Marketplace as a buyer or seller"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isForgotPassword ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Reset Link
              </Button>

              <div className="mt-4 text-center text-sm">
                <button
                  onClick={() => setIsForgotPassword(false)}
                  className="text-primary hover:underline font-medium"
                >
                  Back to sign in
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={isLogin ? handleSignIn : handleSignUp} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={!isLogin}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>I want to</Label>
                    <RadioGroup value={role} onValueChange={(value) => setRole(value as "buyer" | "seller")}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="buyer" id="buyer" />
                        <Label htmlFor="buyer" className="font-normal cursor-pointer">
                          Buy products
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="seller" id="seller" />
                        <Label htmlFor="seller" className="font-normal cursor-pointer">
                          Sell my products
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(true)}
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLogin ? "Sign In" : "Sign Up"}
              </Button>
            </form>
          )}

          {!isForgotPassword && (
            <div className="mt-4 text-center text-sm">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
