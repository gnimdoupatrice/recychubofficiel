import { Recycle, Phone, MapPin, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-14 border-t-2 border-foreground">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* logo + description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-background text-foreground border-2 border-background flex items-center justify-center">
                <Recycle className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="font-display font-extrabold text-base text-background uppercase tracking-wider">RECYC HUB</span>
            </div>
            <p className="text-sm text-background/60 leading-relaxed">
              Plateforme phygitale de gestion des déchets et de sensibilisation environnementale à Kara, Togo.
            </p>
            <div className="flex gap-2 mt-5" aria-label="Suivez-nous">
              {[
                { label: "Facebook", path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54v-2.89h2.54V9.797c0-2.507 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" },
                { label: "Twitter", path: "M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.555-2.005.959-3.127 1.184a4.918 4.918 0 00-8.384 4.482c-4.086-.205-7.713-2.164-10.141-5.144a4.822 4.822 0 00-.666 2.475c0 1.708.869 3.214 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.925 4.925 0 003.946 4.827 4.997 4.997 0 01-2.224.084 4.928 4.928 0 004.6 3.417 9.868 9.868 0 01-6.102 2.103c-.395 0-.785-.023-1.17-.069a13.945 13.945 0 007.548 2.212c9.057 0 14.01-7.496 14.01-13.986 0-.21-.005-.423-.015-.633A10.025 10.025 0 0024 4.557z" },
                { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.337 3.608 1.312.975.975 1.25 2.242 1.312 3.608.058 1.266.07 1.646.07 4.851s-.012 3.584-.07 4.85c-.062 1.366-.337 2.633-1.312 3.608-.975.975-2.242 1.25-3.608 1.312-1.266.058-1.646.07-4.851.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.337-3.608-1.312-.975-.975-1.25-2.242-1.312-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.337-2.633 1.312-3.608C4.52 2.5 5.787 2.225 7.153 2.163 8.419 2.105 8.799 2.163 12 2.163z" },
              ].map(s => (
                <a key={s.label} href="#" aria-label={s.label} className="w-9 h-9 bg-foreground text-background border-2 border-background hover:bg-secondary hover:text-secondary-foreground transition-colors flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* navigation */}
          <div>
            <h4 className="font-display font-extrabold text-background mb-4 uppercase tracking-[0.18em] text-xs border-b-2 border-background/30 pb-2">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/enlevement" className="hover:text-secondary transition-colors uppercase tracking-wide font-semibold text-xs">Enlèvement déchets</Link></li>
              <li><Link to="/vendre" className="hover:text-secondary transition-colors uppercase tracking-wide font-semibold text-xs">Vente plastiques</Link></li>
              <li><Link to="/alerte" className="hover:text-secondary transition-colors uppercase tracking-wide font-semibold text-xs">Alerte dépotoir</Link></li>
              <li><Link to="/academy" className="hover:text-secondary transition-colors uppercase tracking-wide font-semibold text-xs">Green Academy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-extrabold text-background mb-4 uppercase tracking-[0.18em] text-xs border-b-2 border-background/30 pb-2">Liens</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/evenements" className="hover:text-secondary transition-colors uppercase tracking-wide font-semibold text-xs">Événements</Link></li>
              <li><Link to="/connexion" className="hover:text-secondary transition-colors uppercase tracking-wide font-semibold text-xs">Connexion</Link></li>
              <li><Link to="/inscription" className="hover:text-secondary transition-colors uppercase tracking-wide font-semibold text-xs">S'inscrire</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-extrabold text-background mb-4 uppercase tracking-[0.18em] text-xs border-b-2 border-background/30 pb-2">Contact</h4>
            <address className="not-italic space-y-3 text-xs">
              <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-secondary mt-0.5 shrink-0" aria-hidden="true" /> Kara, Préfecture de Kozah</div>
              <div className="flex items-start gap-2"><Phone className="w-4 h-4 text-secondary mt-0.5 shrink-0" aria-hidden="true" /> <a href="tel:+22897684030" className="hover:text-secondary transition-colors">+228 97 68 40 30</a></div>
              <div className="flex items-start gap-2"><Mail className="w-4 h-4 text-secondary mt-0.5 shrink-0" aria-hidden="true" /> <a href="mailto:recychubtogo@gmail.com" className="hover:text-secondary transition-colors break-all">recychubtogo@gmail.com</a></div>
            </address>
          </div>
        </div>

        {/* newsletter */}
        <div className="mt-12 pt-10 border-t-2 border-background/20">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-secondary mb-3">Newsletter</p>
            <h4 className="font-display text-xl font-extrabold text-background uppercase tracking-wide mb-5">
              Restez informé
            </h4>
            <form className="flex flex-col sm:flex-row items-stretch gap-0">
              <label htmlFor="newsletter" className="sr-only">Inscrivez-vous à la newsletter</label>
              <input
                id="newsletter"
                type="email"
                placeholder="VOTRE EMAIL"
                className="flex-1 px-4 py-3 bg-background text-foreground border-2 border-background placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-secondary text-sm font-semibold uppercase tracking-wider"
              />
              <button type="submit" className="mt-2 sm:mt-0 sm:-ml-0.5 px-6 py-3 bg-secondary text-secondary-foreground border-2 border-background font-extrabold text-xs uppercase tracking-[0.18em] hover:bg-background hover:text-foreground transition-colors flex items-center justify-center gap-2">
                S'abonner <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t-2 border-background/20 mt-10 pt-6 text-center text-[10px] uppercase tracking-[0.2em] text-background/40 font-bold">
          © {new Date().getFullYear()} RECYC HUB TOGO — Tous droits réservés
        </div>
      </div>
    </footer>
  );
};

export default Footer;
