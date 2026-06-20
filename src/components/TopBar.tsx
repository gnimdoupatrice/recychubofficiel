import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

/**
 * Bande de contact pro inspirée des sites de services locaux.
 * Crée un signal de confiance immédiat : téléphone, email, horaires.
 * Masquée en mobile pour laisser place à la navbar.
 */
const TopBar = () => {
  return (
    <div
      className="hidden md:block fixed top-0 left-0 right-0 z-[60] w-full bg-gradient-to-r from-primary via-primary to-secondary text-primary-foreground text-[12.5px] font-medium"
      role="complementary"
      aria-label="Coordonnées RECYC HUB TOGO"
    >
      <div className="container max-w-[1440px] mx-auto px-5 lg:px-10 h-10 flex items-center justify-between gap-6">
        {/* Coordonnées */}
        <div className="flex items-center gap-5">
          <a
            href="tel:+22897684030"
            className="inline-flex items-center gap-1.5 hover:text-secondary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
          >
            <Phone className="w-3.5 h-3.5" aria-hidden="true" />
            <span>+228 97 68 40 30</span>
          </a>
          <span className="opacity-40" aria-hidden="true">|</span>
          <a
            href="mailto:contact@recychubtogo.com"
            className="hidden lg:inline-flex items-center gap-1.5 hover:text-secondary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
          >
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            <span>contact@recychubtogo.com</span>
          </a>
          <span className="hidden lg:inline opacity-40" aria-hidden="true">|</span>
          <span className="hidden lg:inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            Kara, Togo
          </span>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <a
              href="https://facebook.com/recychubtogo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook RECYC HUB TOGO"
              className="hover:text-secondary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://instagram.com/recychubtogo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram RECYC HUB TOGO"
              className="hover:text-secondary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
