import { createFileRoute } from "@tanstack/react-router";
import { BranchLocator, PageHero } from "@/components/site/Sections";

export const Route = createFileRoute("/branches")({
  head: () => ({
    meta: [
      { title: "Our Branches & Hours — Sara Bedroom Solution" },
      { name: "description", content: "Visit Sara Bedroom at Gollgul Tower, Century Mall, Bole Medhanealem and Lebu. Mon–Sat 9–8, Sun 11–7." },
      { property: "og:title", content: "Branches — Sara Bedroom Solution" },
      { property: "og:description", content: "Four boutiques across Addis Ababa." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Branch Locator" title="Find Your Nearest Boutique" sub="Feel the fabrics in person at any of our four Addis Ababa locations." />
      <BranchLocator />
    </>
  ),
});
