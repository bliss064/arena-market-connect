// Utility to resolve product images from name and optional image URL
// Prefers provided image_url when valid; otherwise maps known product names to bundled assets.

import productRice from "@/assets/product-rice.jpg";
import productIphone from "@/assets/product-iphone.jpg";
import productPolo from "@/assets/product-polo.jpg";
import productMop from "@/assets/product-mop-bucket.jpg";
import productPalmOil from "@/assets/product-palmoil.jpg";
import productAnkara from "@/assets/product-ankara.jpg";
import productNecklace from "@/assets/product-necklace.jpg";
import productTomatoes from "@/assets/product-tomatoes.jpg";
import productSpeaker from "@/assets/product-speaker.jpg";
import productSneakers from "@/assets/product-sneakers.jpg";
import productCharger from "@/assets/product-charger.jpg";

const mappings: { test: RegExp; src: string }[] = [
  { test: /rice/i, src: productRice },
  { test: /iphone/i, src: productIphone },
  { test: /polo/i, src: productPolo },
  { test: /mop|bucket/i, src: productMop },
  { test: /palm\s*oil/i, src: productPalmOil },
  { test: /ankara/i, src: productAnkara },
  { test: /necklace|gold/i, src: productNecklace },
  { test: /tomato/i, src: productTomatoes },
  { test: /speaker|jbl/i, src: productSpeaker },
  { test: /sneaker|nike/i, src: productSneakers },
  { test: /buds|charger|charge/i, src: productCharger },
];

export function resolveProductImage(name: string, imageUrl?: string | null): string {
  // If the backend provided a real URL that's not the placeholder, use it as-is
  if (imageUrl && imageUrl !== "/placeholder.svg") {
    return imageUrl;
  }

  // Try to map by name keywords
  for (const { test, src } of mappings) {
    if (test.test(name)) return src;
  }

  // Final fallback to public placeholder
  return "/placeholder.svg";
}
