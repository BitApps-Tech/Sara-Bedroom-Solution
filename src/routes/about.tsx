import { createFileRoute } from "@tanstack/react-router";
import { BrandStory, GrandBanner, PageHero } from "@/components/site/Sections";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Sara Bedroom Solution" },
      { name: "description", content: "Our vision, mission and commitments — Ethiopian luxury bedding since 2003 E.C." },
      { property: "og:title", content: "About Sara Bedroom Solution" },
      { property: "og:description", content: "Vision, mission and the values behind our bedding." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Since 2003 E.C." title="About Sara" sub="A family of brands devoted to beautiful, comfortable bedrooms across Ethiopia." />
      <BrandStory />
      <GrandBanner />
    </>
  ),
});
