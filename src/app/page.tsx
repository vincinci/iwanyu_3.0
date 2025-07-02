import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { VendorShowcase } from "@/components/home/VendorShowcase";
import { Newsletter } from "@/components/home/Newsletter";
import { FeatureSection } from "@/components/home/FeatureSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <FeatureSection />
      <VendorShowcase />
      <Newsletter />
    </div>
  );
}
