import { ShoppingBag, Truck, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const MobileStickyBar = () => (
  <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
    <div className="bg-background/95 backdrop-blur-xl border-t border-border px-3 py-2 flex items-center gap-2">
      <Link
        to="/vendre"
        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full gradient-bio text-primary-foreground font-semibold text-sm transition-transform active:scale-95"
      >
        <ShoppingBag className="w-4 h-4" />
        Vendre
      </Link>
      <Link
        to="/enlevement"
        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full border-2 border-primary text-primary font-semibold text-sm transition-all active:scale-95"
      >
        <Truck className="w-4 h-4" />
        Enlèvement
      </Link>
      <a
        href="tel:+22897684030"
        className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
        aria-label="Appeler"
      >
        <Phone className="w-4 h-4 text-primary" />
      </a>
    </div>
  </div>
);

export default MobileStickyBar;
