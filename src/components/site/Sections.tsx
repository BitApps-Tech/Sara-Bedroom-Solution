import { Link } from "@tanstack/react-router";
import { BadgeCheck, Clock, Gem, Heart, MapPin, Navigation, Phone, Play, ShieldCheck, Sparkles, Eye, ShoppingBag } from "lucide-react";
import { useEffect, useState, type ComponentType } from "react";
import hero from "@/assets/hero.jpg";
import grand from "@/assets/grand.jpg";
import { branches, categories, formatETB, mapsUrl, PHONE, products, type Branch, type Product } from "@/lib/data";
import { useStore } from "@/lib/store";

export const btnGold = "inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-semibold tracking-wide text-primary-foreground shadow-gold transition hover:brightness-110";
export const btnGlass = "glass inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide text-foreground transition hover:border-gold hover:text-gold";

export function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-4 text-4xl text-foreground md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-veil" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 text-center">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-4 text-5xl text-foreground md:text-6xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{sub}</p>
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      <img src={hero} alt="Luxury bedroom staged with Sara Bedroom bedding" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl items-center px-4 py-20">
        <div className="glass max-w-xl rounded-3xl p-8 shadow-gold md:p-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <span className="eyebrow">Make Your Bedroom Beautiful</span>
          <h1 className="mt-5 text-4xl leading-tight text-foreground md:text-6xl">
            Transform Your Bedroom Into a <span className="italic text-gold-gradient">Royal Sanctuary</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">Pioneering Ethiopian luxury bedding since 2003 E.C.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/categories" className={btnGold}>Explore Catalog</Link>
            <Link to="/branches" className={btnGlass}><MapPin className="h-4 w-4" /> Find Nearest Branch</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductCard({ p }: { p: Product }) {
  const { setQuickView, addToCart, toggleWish, wishlist } = useStore();
  return (
    <div className="group glass gold-sheen overflow-hidden rounded-2xl transition duration-500 hover:-translate-y-1.5 hover:shadow-gold">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={p.image} alt={p.name} loading="lazy" width={768} height={960} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <button aria-label="Wishlist" onClick={() => toggleWish(p)} className="glass absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-gold">
          <Heart className={`h-4 w-4 ${wishlist.includes(p.id) ? "fill-current" : ""}`} />
        </button>
        <button onClick={() => setQuickView(p)} className="glass absolute inset-x-4 bottom-4 flex translate-y-3 items-center justify-center gap-2 rounded-full py-2.5 text-sm text-foreground opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
          <Eye className="h-4 w-4 text-gold" /> Quick View
        </button>
      </div>
      <div className="flex items-end justify-between gap-2 p-4">
        <div>
          <h3 className="text-lg text-foreground">{p.name}</h3>
          <p className="text-sm text-gold">{formatETB(p.price)}</p>
        </div>
        <button aria-label="Add to cart" onClick={() => addToCart(p)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/50 text-gold transition hover:bg-gold hover:text-primary-foreground">
          <ShoppingBag className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function CategoryShowcase({ limit }: { limit?: number }) {
  const [active, setActive] = useState("all");
  const list = (active === "all" ? products : products.filter((p) => p.category === active)).slice(0, limit ?? 99);
  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <SectionHead eyebrow="The Collection" title="Featured Categories" sub="Hand-picked bedding, bath and sleepwear crafted for opulent comfort." />
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {[{ id: "all", name: "All" }, ...categories].map((c) => (
          <button key={c.id} onClick={() => setActive(c.id)}
            className={`rounded-full border px-4 py-2 text-sm transition ${active === c.id ? "border-gold bg-gold-gradient text-primary-foreground" : "border-gold/40 text-foreground/80 hover:border-gold hover:text-gold"}`}>
            {c.name}
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}

const commitments = [
  { icon: Gem, title: "Premium Quality & Fair Prices" },
  { icon: Sparkles, title: "Modern & Elegant Designs" },
  { icon: Heart, title: "Customer-First Warmth" },
  { icon: ShieldCheck, title: "Trust, Honesty & Reliability" },
];

export function BrandStory() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <div className="glass rounded-3xl p-8 md:p-14">
        <SectionHead eyebrow="Our Story" title="Comfort, Crafted With Purpose" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            ["Vision", "To become a trusted and leading bedroom solutions brand in Ethiopia and beyond, creating beautiful, comfortable, and quality spaces that make every home feel special."],
            ["Mission", "To provide high-quality bedding and bedroom products that combine comfort, style, durability, and affordability, while giving every customer a warm and satisfying shopping experience."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-border bg-background/40 p-8">
              <span className="eyebrow">Our {t}</span>
              <p className="mt-4 font-display text-xl leading-relaxed text-foreground/90 italic">“{d}”</p>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map(({ icon: I, title }) => (
            <div key={title} className="gold-sheen rounded-2xl border border-border bg-background/40 p-6 text-center transition hover:-translate-y-1 hover:shadow-gold">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gold-gradient text-primary-foreground"><I className="h-5 w-5" /></span>
              <p className="mt-4 font-display text-foreground">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type BranchMapProps = {
  branches: Branch[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function BranchLocator() {
  const [selectedId, setSelectedId] = useState(branches[0]!.id);
  const [MapView, setMapView] = useState<ComponentType<BranchMapProps> | null>(null);
  const selected = branches.find((b) => b.id === selectedId) ?? branches[0]!;

  useEffect(() => {
    let alive = true;
    void import("./BranchMap").then((m) => {
      if (alive) setMapView(() => m.BranchMap);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <SectionHead
        eyebrow="Addis Ababa Branches"
        title="Discover Sara Bedroom in Addis Ababa"
        sub="Tap a boutique on the map or in the list to explore hours, directions, and details."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-5">
        <div className="relative overflow-hidden rounded-2xl border border-border lg:col-span-3">
          <div className="h-[420px] bg-muted/30 lg:h-[520px]">
            {MapView ? (
              <MapView branches={branches} selectedId={selectedId} onSelect={setSelectedId} />
            ) : (
              <div className="grid h-full place-items-center text-sm text-muted-foreground">Loading map…</div>
            )}
          </div>
          <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-xl border border-border/80 bg-background/90 px-4 py-3 shadow-gold backdrop-blur">
            <p className="font-display text-lg text-foreground">{selected.name}</p>
            <p className="text-sm text-gold">{selected.area}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="rounded-2xl border border-gold/50 bg-gold/10 p-6 shadow-gold">
            <h3 className="font-display text-3xl text-foreground">{selected.name}</h3>
            <p className="mt-1 text-gold">{selected.area}</p>
            <p className="mt-1 text-sm text-muted-foreground">{selected.detail}</p>
            <p className="mt-4 flex items-start gap-2 text-sm text-foreground/90">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {selected.hours}
            </p>
            <a href={`tel:${selected.phone}`} className="mt-3 inline-flex items-center gap-2 text-sm text-foreground/90 hover:text-gold">
              <Phone className="h-4 w-4 text-gold" />
              {selected.phone}
            </a>
            <a
              href={mapsUrl(selected.q)}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold hover:underline"
            >
              <Navigation className="h-4 w-4" />
              View Branch Details
            </a>
          </div>

          <ul className="space-y-1">
            {branches.map((b) => {
              const active = b.id === selectedId;
              return (
                <li key={b.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(b.id)}
                    className={`w-full rounded-xl px-4 py-3 text-left transition ${
                      active ? "bg-gold/15 ring-1 ring-gold/50" : "hover:bg-accent"
                    }`}
                  >
                    <span className="block font-display text-xl text-foreground">{b.name}</span>
                    <span className="block text-sm text-gold">{b.area}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function GrandBanner() {
  return (
    <section id="sara-grand" className="mx-auto max-w-7xl px-4 py-12">
      <div className="relative overflow-hidden rounded-3xl border border-gold/40">
        <img src={grand} alt="Sara Grand hotel linen supply" loading="lazy" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
        <div className="relative max-w-xl p-10 md:p-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-3 py-1 text-xs uppercase tracking-widest text-gold"><BadgeCheck className="h-3.5 w-3.5" /> Coming Soon</span>
          <h2 className="mt-5 text-4xl text-foreground md:text-5xl">SARA GRAND</h2>
          <p className="mt-3 font-display text-xl italic text-gold-soft">Premium Wholesale & Hotel Supplies</p>
          <p className="mt-4 text-muted-foreground">B2B catalog and bulk ordering for hotels, guesthouses and hospitality partners — available soon.</p>
          <a href={`tel:${PHONE}`} className={`${btnGlass} mt-8`}>Enquire for Bulk Orders</a>
        </div>
      </div>
    </section>
  );
}

const reels = [
  { handle: "@sara.bedroom", title: "Styling a royal king bed", img: categories[0]!.image },
  { handle: "@sara.grand.hotel", title: "Hotel-grade towels unboxed", img: categories[6]!.image },
  { handle: "@sara.bedroom", title: "Satin pajama night routine", img: categories[7]!.image },
  { handle: "@sara.bedroom", title: "Pillow stack perfection", img: categories[4]!.image },
];

export function TikTokShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <SectionHead eyebrow="Social" title="As Seen on TikTok" sub="Follow @sara.bedroom and @sara.grand.hotel for styling inspiration." />
      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {reels.map((r, i) => (
          <a key={i} href={`https://www.tiktok.com/${r.handle}`} target="_blank" rel="noreferrer" className="group relative aspect-[9/16] overflow-hidden rounded-2xl border border-border transition hover:shadow-gold">
            <img src={r.img} alt={r.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-veil" />
            <span className="glass absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-gold transition group-hover:scale-110"><Play className="h-6 w-6 fill-current" /></span>
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="text-xs text-gold">{r.handle}</p>
              <p className="font-display text-foreground">{r.title}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
