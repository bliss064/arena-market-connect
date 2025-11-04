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

const filenameMappings: Record<string, string> = {
  "product-rice.jpg": productRice,
  "product-iphone.jpg": productIphone,
  "product-polo.jpg": productPolo,
  "product-mop-bucket.jpg": productMop,
  "product-palmoil.jpg": productPalmOil,
  "product-ankara.jpg": productAnkara,
  "product-necklace.jpg": productNecklace,
  "product-tomatoes.jpg": productTomatoes,
  "product-speaker.jpg": productSpeaker,
  "product-sneakers.jpg": productSneakers,
  "product-charger.jpg": productCharger,
};

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
  // If the backend provided something and it's not the placeholder, resolve it smartly
  if (imageUrl && imageUrl !== "/placeholder.svg") {
    const lower = imageUrl.toLowerCase();

    // If it's an absolute/external url or a public path, use as-is
    if (
      lower.startsWith("http://") ||
      lower.startsWith("https://") ||
      lower.startsWith("data:") ||
      lower.startsWith("blob:") ||
      lower.startsWith("/storage/") ||
      lower.startsWith("/assets/") ||
      lower.startsWith("/images/") ||
      lower.startsWith("/")
    ) {
      return imageUrl;
    }

    // If backend sent just a filename, map to bundled asset
    const filename = imageUrl.split("?")[0].split("#")[0].split("/").pop() || imageUrl;
    if (filename in filenameMappings) {
      return filenameMappings[filename];
    }

    // Unknown relative path - return as-is
    return imageUrl;
  }

  // Map by name keywords
  for (const { test, src } of mappings) {
    if (test.test(name)) return src;
  }

  // Final fallback to public placeholder
  return "/placeholder.svg";
}
