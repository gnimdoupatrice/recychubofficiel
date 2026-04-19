import { ShoppingBag, Truck, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const WHATSAPP_URL = `https://wa.me/22897684030?text=${encodeURIComponent(
  "Bonjour RECYC HUB, je souhaite en savoir plus sur vos services."
)}`;

const MobileStickyBar = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
    <div className="bg-background/95 backdrop-blur-xl border-t border-border px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex items-center gap-2">
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
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 shadow-md active:scale-95 transition-transform"
        aria-label="Contacter via WhatsApp"
      >
        <MessageCircle className="w-5 h-5 text-white" />
      </a>
    </div>
  </div>
);

export default MobileStickyBar;
