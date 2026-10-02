import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, ProductCard, SectionHead, btnGold } from "@/components/site/Sections";
import { categories, products } from "@/lib/data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections & Wishlist — Sara Bedroom Solution" },
      { name: "description", content: "Curated luxury bedding collections and your saved wishlist." },
      { property: "og:title", content: "Collections — Sara Bedroom Solution" },
      { property: "og:description", content: "Curated suites of bedding, bath and sleepwear." },
    ],
  }),
  component: Collections,
});

function Collections() {
  const { wishlist } = useStore();
  const saved = products.filter((p) => wishlist.includes(p.id));
  return (
    <>
      <PageHero eyebrow="Curated" title="Collections" sub="Suites designed to work together — and the pieces you've saved." />
      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHead eyebrow="Your Wishlist" title="Saved Pieces" />
        {saved.length === 0 ? (
          <div className="mt-10 text-center text-muted-foreground">
            <p>Tap the heart on any piece to save it here.</p>
            <Link to="/categories" className={`${btnGold} mt-6`}>Explore Catalog</Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{saved.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        )}
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-10 md:grid-cols-2 lg:grid-cols-4">
        {categories.filter((_, i) => [0, 2, 5, 6].includes(i)).map((c) => (
          <Link to="/categories" key={c.id} className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border">
            <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-veil" />
            <div className="absolute bottom-0 p-6">
              <span className="eyebrow">{c.blurb}</span>
              <h3 className="mt-2 text-2xl text-foreground">The {c.name.split(" ")[0]} Suite</h3>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
