import { ShoppingBag, Truck, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const WHATSAPP_URL = `https://wa.me/22897684030?text=${encodeURIComponent(
  "Bonjour RECYC HUB, je souhaite en savoir plus sur vos services."
)}`;

const MobileStickyBar = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
    <div className="bg-background border-t-2 border-foreground px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex items-center gap-2">
      <Link
        to="/vendre"
        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-primary text-primary-foreground border-2 border-primary text-[11px] font-bold uppercase tracking-[0.12em] active:translate-y-[1px] transition-transform"
      >
        <ShoppingBag className="w-4 h-4" />
        Vendre
      </Link>
      <Link
        to="/enlevement"
        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-transparent text-foreground border-2 border-foreground text-[11px] font-bold uppercase tracking-[0.12em] active:translate-y-[1px] transition-transform"
      >
        <Truck className="w-4 h-4" />
        Enlèvement
      </Link>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 bg-[#25D366] border-2 border-foreground flex items-center justify-center shrink-0 active:translate-y-[1px] transition-transform"
        aria-label="Contacter via WhatsApp"
      >
        <MessageCircle className="w-5 h-5 text-white" />
      </a>
    </div>
  </div>
);

export default MobileStickyBar;
