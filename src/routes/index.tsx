import { createFileRoute } from "@tanstack/react-router";
import { BrandStory, BranchLocator, CategoryShowcase, GrandBanner, Hero, TikTokShowcase } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sara Bedroom Solution — Luxury Bedding in Addis Ababa" },
      { name: "description", content: "Pioneering Ethiopian luxury bedding since 2003 E.C. Comforters, sheets, duvets, towels and sleepwear at four Addis Ababa branches." },
      { property: "og:title", content: "Sara Bedroom Solution — Make Your Bedroom Beautiful" },
      { property: "og:description", content: "Transform your bedroom into a royal sanctuary with premium Ethiopian bedding." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <CategoryShowcase limit={8} />
      <BrandStory />
      <GrandBanner />
      <BranchLocator />
      <TikTokShowcase />
    </>
  );
}
