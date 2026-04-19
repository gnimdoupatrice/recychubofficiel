import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = `https://wa.me/22897684030?text=${encodeURIComponent(
  "Bonjour RECYC HUB, je souhaite en savoir plus sur vos services."
)}`;

/**
 * FAB WhatsApp pour desktop uniquement.
 * Sur mobile, l'action WhatsApp est intégrée dans MobileStickyBar (évite chevauchement).
 */
const WhatsAppButton = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contacter via WhatsApp"
    className="hidden lg:flex fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white items-center justify-center shadow-lg hover:scale-110 transition-transform"
  >
    <MessageCircle className="w-7 h-7" />
  </a>
);

export default WhatsAppButton;
