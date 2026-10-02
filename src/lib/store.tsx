import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { products, type Product } from "./data";

type CartLine = { id: string; qty: number };
type Ctx = {
  cart: CartLine[];
  wishlist: string[];
  addToCart: (p: Product) => void;
  setQty: (id: string, qty: number) => void;
  toggleWish: (p: Product) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  quickView: Product | null;
  setQuickView: (p: Product | null) => void;
  cartCount: number;
  cartTotal: number;
};

const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("sara-cart") || "[]"));
      setWishlist(JSON.parse(localStorage.getItem("sara-wish") || "[]"));
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("sara-cart", JSON.stringify(cart));
    localStorage.setItem("sara-wish", JSON.stringify(wishlist));
  }, [cart, wishlist, loaded]);

  const addToCart = (p: Product) => {
    setCart((c) => {
      const ex = c.find((l) => l.id === p.id);
      return ex ? c.map((l) => (l.id === p.id ? { ...l, qty: l.qty + 1 } : l)) : [...c, { id: p.id, qty: 1 }];
    });
    toast.success(`${p.name} added to your cart`);
  };
  const setQty = (id: string, qty: number) =>
    setCart((c) => (qty <= 0 ? c.filter((l) => l.id !== id) : c.map((l) => (l.id === id ? { ...l, qty } : l))));
  const toggleWish = (p: Product) => {
    const has = wishlist.includes(p.id);
    setWishlist((w) => (has ? w.filter((x) => x !== p.id) : [...w, p.id]));
    toast(has ? `Removed ${p.name} from wishlist` : `${p.name} saved to wishlist`);
  };

  const cartCount = cart.reduce((s, l) => s + l.qty, 0);
  const cartTotal = cart.reduce((s, l) => s + (products.find((p) => p.id === l.id)?.price ?? 0) * l.qty, 0);

  return (
    <StoreCtx.Provider
      value={{ cart, wishlist, addToCart, setQty, toggleWish, cartOpen, setCartOpen, searchOpen, setSearchOpen, quickView, setQuickView, cartCount, cartTotal }}
    >
      {children}
    </StoreCtx.Provider>
  );
}

export const useStore = () => {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore outside provider");
  return c;
};
