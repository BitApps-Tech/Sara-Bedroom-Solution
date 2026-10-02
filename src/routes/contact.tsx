import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { toast } from "sonner";
import { PageHero, btnGold } from "@/components/site/Sections";
import { PHONE } from "@/lib/data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Sara Bedroom Solution" },
      { name: "description", content: `Call ${PHONE} or send us a message about orders, bulk supply or styling.` },
      { property: "og:title", content: "Contact Sara Bedroom Solution" },
      { property: "og:description", content: "Reach our team for orders and enquiries." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const field = "w-full rounded-xl border border-input bg-background/50 px-4 py-3 outline-none transition focus:border-gold";
  return (
    <>
      <PageHero eyebrow="Get in Touch" title="Contact Us" sub="We'd love to help you create your dream bedroom." />
      <section className="mx-auto grid max-w-5xl gap-8 px-4 py-20 md:grid-cols-5">
        <div className="glass rounded-2xl p-8 md:col-span-2">
          <Phone className="h-8 w-8 text-gold" />
          <h2 className="mt-4 text-2xl">Call Direct</h2>
          <a href={`tel:${PHONE}`} className="mt-2 block font-display text-3xl text-gold-gradient">{PHONE}</a>
          <p className="mt-6 text-sm text-muted-foreground">Mon – Sat: 9:00 AM – 8:00 PM<br />Sunday: 11:00 AM – 7:00 PM</p>
        </div>
        <form
          className="glass space-y-4 rounded-2xl p-8 md:col-span-3"
          onSubmit={(e) => { e.preventDefault(); toast.success("Message received — we'll be in touch soon."); e.currentTarget.reset(); }}
        >
          <input required placeholder="Your name" className={field} />
          <input required placeholder="Phone number" className={field} />
          <textarea required rows={5} placeholder="How can we help?" className={field} />
          <button className={`${btnGold} w-full`}>Send Message</button>
        </form>
      </section>
    </>
  );
}
