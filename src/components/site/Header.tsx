import { Link } from "@tanstack/react-router";
import { Heart, MapPin, Menu, Search, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useStore } from "@/lib/store";

const nav = [
  { to: "/", label: "Home" },
  { to: "/categories", label: "Categories" },
  { to: "/collections", label: "Collections" },
  { to: "/branches", label: "Branches" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center">
      <img
        src="/logo.png"
        alt="Sara Grand — Hotel Linens & Solutions"
        className="h-28 w-auto object-contain"
      />
    </Link>
  );
}

export function Header() {
  const { cartCount, wishlist, setCartOpen, setSearchOpen } = useStore();
  const [open, setOpen] = useState(false);
  const iconBtn = "relative grid h-10 w-10 place-items-center rounded-full text-foreground/80 transition hover:bg-accent hover:text-gold";

  return (
    <>
      <div className="border-b border-border bg-midnight text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 sm:justify-between">
          <div className="flex items-center gap-1 rounded-full border border-border p-0.5">
            <span className="rounded-full bg-gold-gradient px-3 py-1 font-medium text-primary-foreground">Sara Bedroom Solution · Retail</span>
            <a href="#sara-grand" className="px-3 py-1 text-muted-foreground hover:text-gold">Sara Grand · Hotel & B2B <span className="text-gold">Soon</span></a>
          </div>
          <span className="hidden italic text-gold-soft sm:block">“Make Your Bedroom Beautiful”</span>
        </div>
      </div>
      <header className="sticky top-0 z-40 glass border-x-0 border-t-0">
        <div className="mx-auto flex min-h-28 max-w-7xl items-center justify-between gap-4 px-4 py-2">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="text-sm text-foreground/75 transition hover:text-gold" activeProps={{ className: "text-gold" }} activeOptions={{ exact: true }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <button aria-label="Search" className={iconBtn} onClick={() => setSearchOpen(true)}><Search className="h-5 w-5" /></button>
            <Link to="/collections" aria-label="Wishlist" className={iconBtn}>
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.6rem] font-bold text-primary-foreground">{wishlist.length}</span>}
            </Link>
            <button aria-label="Cart" className={iconBtn} onClick={() => setCartOpen(true)}>
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.6rem] font-bold text-primary-foreground">{cartCount}</span>}
            </button>
            <Link to="/branches" className="ml-2 hidden items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-xs uppercase tracking-widest text-gold transition hover:bg-gold hover:text-primary-foreground md:flex">
              <MapPin className="h-4 w-4" /> Branches
            </Link>
            <button aria-label="Menu" className={`${iconBtn} lg:hidden`} onClick={() => setOpen(true)}><Menu className="h-5 w-5" /></button>
          </div>
        </div>
      </header>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="border-border bg-background">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="mt-2"><Logo /></div>
          <nav className="mt-10 flex flex-col gap-1">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-display text-xl text-foreground/85 hover:bg-accent hover:text-gold" activeProps={{ className: "text-gold" }} activeOptions={{ exact: true }}>
                {n.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
