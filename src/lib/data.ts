import comforters from "@/assets/cat-comforters.jpg";
import bedsheets from "@/assets/cat-bedsheets.jpg";
import pillows from "@/assets/cat-pillows.jpg";
import blankets from "@/assets/cat-blankets.jpg";
import towels from "@/assets/cat-towels.jpg";
import sleepwear from "@/assets/cat-sleepwear.jpg";

export type Category = { id: string; name: string; image: string; blurb: string };

export const categories: Category[] = [
  { id: "comforters", name: "Comforters", image: comforters, blurb: "Cloud-soft warmth" },
  { id: "bedsheets", name: "Bedsheets", image: bedsheets, blurb: "Crisp, breathable cotton" },
  { id: "bedcovers", name: "Bedcovers", image: bedsheets, blurb: "Tailored elegance" },
  { id: "duvets", name: "Duvets & Duvet Covers", image: comforters, blurb: "Layered luxury" },
  { id: "pillows", name: "Pillows & Protectors", image: pillows, blurb: "Pillows, pads & protectors" },
  { id: "blankets", name: "Blankets & Throws", image: blankets, blurb: "Wrapped in comfort" },
  { id: "towels", name: "Towels & Robes", image: towels, blurb: "Spa-grade softness" },
  { id: "sleepwear", name: "Pajamas & Sleepwear", image: sleepwear, blurb: "Satin evenings" },
];

export type Product = { id: string; name: string; category: string; price: number; image: string; description: string };

const mk = (id: string, name: string, category: string, price: number, description: string): Product => ({
  id, name, category, price, description,
  image: categories.find((c) => c.id === category)!.image,
});

export const products: Product[] = [
  mk("p1", "Royal Satin Comforter", "comforters", 8900, "Champagne satin with gold piping, all-season fill."),
  mk("p2", "Imperial Down-Alt Comforter", "comforters", 7400, "Hypoallergenic, hotel-weight loft."),
  mk("p3", "Gold Vine Bedsheet Set", "bedsheets", 4200, "Embroidered border, 400TC cotton sateen."),
  mk("p4", "Ivory Classic Sheet Set", "bedsheets", 3500, "Everyday crisp percale in soft ivory."),
  mk("p5", "Palace Quilted Bedcover", "bedcovers", 6200, "Quilted diamond stitch, reversible."),
  mk("p6", "Midnight Duvet Cover", "duvets", 5100, "Navy sateen with cream trim."),
  mk("p7", "Grand Silk-Touch Pillow", "pillows", 1800, "Medium support, gold-edged case."),
  mk("p8", "Waterproof Mattress Protector", "pillows", 2400, "Silent, breathable, fitted."),
  mk("p9", "Cream Knit Throw", "blankets", 2900, "Chunky knit with fringe edge."),
  mk("p10", "Monogram Towel Trio", "towels", 2600, "700gsm Egyptian cotton."),
  mk("p11", "Hotel Shawl Robe", "towels", 3800, "Plush terry with gold trim."),
  mk("p12", "Champagne Satin Pajama Set", "sleepwear", 3300, "Navy piping, gold buttons."),
];

export const formatETB = (n: number) => `ETB ${n.toLocaleString("en-US")}`;

export type Branch = {
  id: string;
  name: string;
  detail: string;
  area: string;
  hours: string;
  phone: string;
  lat: number;
  lng: number;
  q: string;
};

export const PHONE = "0911340146";

export const branches: Branch[] = [
  {
    id: "gollgul",
    name: "Gollgul Tower",
    detail: "1st Floor, Shop #106",
    area: "Gollgul Tower, Addis Ababa",
    hours: "Mon–Sat: 9:00 AM – 8:00 PM · Sun: 11:00 AM – 7:00 PM",
    phone: PHONE,
    lat: 9.015357,
    lng: 38.78709,
    q: "Gollgul Tower Addis Ababa",
  },
  {
    id: "century",
    name: "Century Mall",
    detail: "3rd Floor, Shop #338",
    area: "Century Mall, Gurd Shola, Addis Ababa",
    hours: "Mon–Sat: 9:00 AM – 8:00 PM · Sun: 11:00 AM – 7:00 PM",
    phone: PHONE,
    lat: 9.019442,
    lng: 38.81385,
    q: "Century Mall Addis Ababa",
  },
  {
    id: "bole",
    name: "Bole Medhanealem",
    detail: "Fana Plaza, Ground Floor",
    area: "Fana Plaza, Bole Medhanealem, Addis Ababa",
    hours: "Mon–Sat: 9:00 AM – 8:00 PM · Sun: 11:00 AM – 7:00 PM",
    phone: PHONE,
    lat: 8.996003,
    lng: 38.79121,
    q: "Fana Plaza Bole Medhanealem Addis Ababa",
  },
  {
    id: "lebu",
    name: "Lebu",
    detail: "Panda Mall, Ground Floor",
    area: "Panda Mall, Lebu, Addis Ababa",
    hours: "Mon–Sat: 9:00 AM – 8:00 PM · Sun: 11:00 AM – 7:00 PM",
    phone: PHONE,
    lat: 8.957446,
    lng: 38.726345,
    q: "Panda Mall Lebu Addis Ababa",
  },
];

export const mapsUrl = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
