import { z } from "zod";

// Product validation schema
export const productSchema = z.object({
  name: z.string()
    .trim()
    .min(3, "Product name must be at least 3 characters")
    .max(200, "Product name must be less than 200 characters"),
  description: z.string()
    .trim()
    .max(5000, "Description must be less than 5000 characters")
    .optional(),
  price: z.number()
    .positive("Price must be greater than 0")
    .max(10000000, "Price must be less than 10,000,000")
    .refine((val) => Number.isFinite(val), "Price must be a valid number"),
  stock_quantity: z.number()
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative")
    .max(100000, "Stock must be less than 100,000"),
  image_url: z.string()
    .trim()
    .max(500, "Image URL must be less than 500 characters")
    .optional()
    .refine(
      (val) => !val || val === "" || val.startsWith("http") || val.startsWith("/") || !val.includes("://"),
      "Image URL must be a valid URL or path"
    ),
});

// Auth validation schemas
export const emailSchema = z.string()
  .trim()
  .email("Invalid email address")
  .max(255, "Email must be less than 255 characters");

export const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password must be less than 100 characters");

export const fullNameSchema = z.string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name must be less than 100 characters")
  .refine((val) => /^[a-zA-Z\s'-]+$/.test(val), "Name can only contain letters, spaces, hyphens, and apostrophes");

// Checkout/Delivery validation schemas
export const phoneSchema = z.string()
  .trim()
  .min(10, "Phone number must be at least 10 digits")
  .max(20, "Phone number must be less than 20 characters")
  .refine((val) => /^[\d\s\-\+\(\)]+$/.test(val), "Phone number can only contain numbers, spaces, and +-()");

export const addressLineSchema = z.string()
  .trim()
  .min(5, "Address must be at least 5 characters")
  .max(200, "Address must be less than 200 characters");

export const citySchema = z.string()
  .trim()
  .min(2, "City must be at least 2 characters")
  .max(100, "City must be less than 100 characters");

export const stateSchema = z.string()
  .trim()
  .min(2, "State must be at least 2 characters")
  .max(100, "State must be less than 100 characters");

export const notesSchema = z.string()
  .trim()
  .max(1000, "Notes must be less than 1000 characters")
  .optional();

// Combined delivery address schema
export const deliveryAddressSchema = z.object({
  full_name: fullNameSchema,
  phone: phoneSchema,
  address_line1: addressLineSchema,
  address_line2: z.string().trim().max(200, "Address line 2 must be less than 200 characters").optional(),
  city: citySchema,
  state: stateSchema,
});

// Helper function to get safe error messages
export function getSafeErrorMessage(error: any): string {
  // Don't expose internal database errors
  if (error?.code === '23505') return 'This item already exists';
  if (error?.code === '23503') return 'Related item not found';
  if (error?.message?.toLowerCase().includes('rls')) return 'Access denied';
  if (error?.message?.toLowerCase().includes('permission')) return 'Access denied';
  if (error?.message?.toLowerCase().includes('duplicate')) return 'This item already exists';
  
  // Generic fallback
  return 'An error occurred. Please try again.';
}
