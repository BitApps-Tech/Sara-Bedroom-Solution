import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { branches, categories, PHONE } from "@/lib/data";
import { Logo } from "./Header";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-midnight">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-5 max-w-sm text-sm text-muted-foreground">Pioneering Ethiopian luxury bedding since 2003 E.C. — beautiful, comfortable and quality spaces that make every home feel special.</p>
          <a href={`tel:${PHONE}`} className="mt-6 inline-flex items-center gap-3 rounded-full border border-gold/50 px-5 py-3 text-gold hover:bg-accent">
            <Phone className="h-4 w-4" /> Call Direct: {PHONE}
          </a>
        </div>
        <div>
          <h4 className="eyebrow">Categories</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {categories.slice(0, 6).map((c) => <li key={c.id}><Link to="/categories" className="hover:text-gold">{c.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow">Stores</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {branches.map((b) => <li key={b.name}><span className="text-foreground/85">{b.name}</span><br />{b.detail}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow">Follow</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="https://www.tiktok.com/@sara.bedroom" target="_blank" rel="noreferrer" className="hover:text-gold">TikTok · @sara.bedroom</a></li>
            <li><a href="https://www.tiktok.com/@sara.grand.hotel" target="_blank" rel="noreferrer" className="hover:text-gold">TikTok · @sara.grand.hotel</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">© 2003 - 2026 Sara Bedroom Solutions. All Rights Reserved.</div>
    </footer>
  );
}
