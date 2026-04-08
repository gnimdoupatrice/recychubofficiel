import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "22897684030"; // À remplacer par le vrai numéro
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour RECYC HUB, je souhaite en savoir plus sur vos services.")}`;

const WhatsAppButton = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contacter via WhatsApp"
    className="fixed bottom-[4.5rem] lg:bottom-6 right-4 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
  >
    <MessageCircle className="w-7 h-7" />
  </a>
);

export default WhatsAppButton;
