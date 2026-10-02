import { createFileRoute } from "@tanstack/react-router";
import { CategoryShowcase, PageHero } from "@/components/site/Sections";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Shop Categories — Sara Bedroom Solution" },
      { name: "description", content: "Browse comforters, bedsheets, duvets, pillows, blankets, towels, robes and sleepwear." },
      { property: "og:title", content: "Shop Categories — Sara Bedroom Solution" },
      { property: "og:description", content: "Luxury bedding and bath categories from Sara Bedroom Solution." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Catalog" title="Shop by Category" sub="Every essential for a five-star night, from duvets to satin sleepwear." />
      <CategoryShowcase />
    </>
  ),
});
