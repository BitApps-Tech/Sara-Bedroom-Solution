import { Heart, Minus, Plus, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { categories, formatETB, products } from "@/lib/data";
import { useStore } from "@/lib/store";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQty, cartTotal } = useStore();
  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex w-full flex-col border-border bg-background sm:max-w-md">
        <SheetTitle className="font-display text-2xl text-foreground">Your Cart</SheetTitle>
        <div className="-mx-2 mt-4 flex-1 space-y-3 overflow-y-auto px-2">
          {cart.length === 0 && <p className="py-16 text-center text-muted-foreground">Your cart is waiting for something beautiful.</p>}
          {cart.map((l) => {
            const p = products.find((x) => x.id === l.id)!;
            return (
              <div key={l.id} className="glass flex gap-3 rounded-xl p-3">
                <img src={p.image} alt={p.name} className="h-20 w-16 rounded-lg object-cover" loading="lazy" />
                <div className="flex-1">
                  <p className="font-display text-foreground">{p.name}</p>
                  <p className="text-sm text-gold">{formatETB(p.price)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button aria-label="Decrease" onClick={() => setQty(l.id, l.qty - 1)} className="grid h-7 w-7 place-items-center rounded-full border border-border hover:border-gold"><Minus className="h-3 w-3" /></button>
                    <span className="w-6 text-center text-sm">{l.qty}</span>
                    <button aria-label="Increase" onClick={() => setQty(l.id, l.qty + 1)} className="grid h-7 w-7 place-items-center rounded-full border border-border hover:border-gold"><Plus className="h-3 w-3" /></button>
                  </div>
                </div>
                <button aria-label="Remove" onClick={() => setQty(l.id, 0)} className="self-start text-muted-foreground hover:text-gold"><X className="h-4 w-4" /></button>
              </div>
            );
          })}
        </div>
        <div className="border-t border-border pt-4">
          <div className="flex justify-between font-display text-lg"><span>Subtotal</span><span className="text-gold">{formatETB(cartTotal)}</span></div>
          <button
            disabled={cart.length === 0}
            onClick={() => toast.success("Thank you! Our team will call you to confirm your order.")}
            className="mt-4 w-full rounded-full bg-gold-gradient py-3 font-medium text-primary-foreground shadow-gold transition hover:brightness-110 disabled:opacity-40"
          >
            Request Order
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function SearchModal() {
  const { searchOpen, setSearchOpen, setQuickView } = useStore();
  const [q, setQ] = useState("");
  const res = q.trim()
    ? products.filter((p) => (p.name + " " + categories.find((c) => c.id === p.category)?.name).toLowerCase().includes(q.toLowerCase()))
    : products.slice(0, 5);
  return (
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent className="border-border bg-popover sm:max-w-xl">
        <DialogTitle className="sr-only">Search</DialogTitle>
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <Search className="h-5 w-5 text-gold" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search comforters, towels, pajamas…" className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground" />
        </div>
        <div className="max-h-80 space-y-1 overflow-y-auto">
          {res.length === 0 && <p className="py-6 text-center text-muted-foreground">No matches found.</p>}
          {res.map((p) => (
            <button key={p.id} onClick={() => { setSearchOpen(false); setQuickView(p); }} className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-accent">
              <img src={p.image} alt="" className="h-12 w-10 rounded object-cover" loading="lazy" />
              <span className="flex-1">{p.name}</span>
              <span className="text-sm text-gold">{formatETB(p.price)}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function QuickViewModal() {
  const { quickView: p, setQuickView, addToCart, toggleWish, wishlist } = useStore();
  return (
    <Dialog open={!!p} onOpenChange={(o) => !o && setQuickView(null)}>
      <DialogContent className="overflow-hidden border-border bg-popover p-0 sm:max-w-3xl">
        {p && (
          <div className="grid sm:grid-cols-2">
            <img src={p.image} alt={p.name} className="h-72 w-full object-cover sm:h-full" />
            <div className="flex flex-col p-8">
              <span className="eyebrow">{categories.find((c) => c.id === p.category)?.name}</span>
              <DialogTitle className="mt-3 font-display text-3xl text-foreground">{p.name}</DialogTitle>
              <p className="mt-2 text-2xl text-gold">{formatETB(p.price)}</p>
              <p className="mt-4 text-muted-foreground">{p.description}</p>
              <div className="mt-auto flex gap-3 pt-8">
                <button onClick={() => addToCart(p)} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-gradient py-3 font-medium text-primary-foreground shadow-gold hover:brightness-110">
                  <ShoppingBag className="h-4 w-4" /> Add to Cart
                </button>
                <button aria-label="Wishlist" onClick={() => toggleWish(p)} className="grid h-12 w-12 place-items-center rounded-full border border-gold/50 text-gold hover:bg-accent">
                  <Heart className={`h-5 w-5 ${wishlist.includes(p.id) ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
