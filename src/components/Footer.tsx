import { Phone, MapPin, Mail, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/logo.png";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-foreground text-background/80 pt-20 pb-10 font-inter">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Editorial top band */}
        <div className="grid lg:grid-cols-12 gap-12 pb-14 border-b border-background/10">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <img src={logoImg} alt="" className="w-10 h-10 object-contain" />
              <span className="font-editorial font-bold text-xl text-background tracking-tight">
                RECYC <span className="italic text-primary">HUB</span> TOGO
              </span>
            </Link>
            <p className="text-sm text-background/60 leading-relaxed max-w-sm font-light">
              Plateforme phygitale de gestion des déchets et de sensibilisation
              environnementale à Kara, Togo.
            </p>
            {/* social icons */}
            <div className="flex gap-2 mt-6" aria-label="Suivez-nous">
              <a href="#" className="w-9 h-9 rounded-sm border border-background/15 flex items-center justify-center text-background/60 hover:text-primary hover:border-primary/40 transition-colors" aria-label="Facebook">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54v-2.89h2.54V9.797c0-2.507 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-sm border border-background/15 flex items-center justify-center text-background/60 hover:text-primary hover:border-primary/40 transition-colors" aria-label="Twitter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                >
                  <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.555-2.005.959-3.127 1.184a4.918 4.918 0 00-8.384 4.482c-4.086-.205-7.713-2.164-10.141-5.144a4.822 4.822 0 00-.666 2.475c0 1.708.869 3.214 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.925 4.925 0 003.946 4.827 4.997 4.997 0 01-2.224.084 4.928 4.928 0 004.6 3.417 9.868 9.868 0 01-6.102 2.103c-.395 0-.785-.023-1.17-.069a13.945 13.945 0 007.548 2.212c9.057 0 14.01-7.496 14.01-13.986 0-.21-.005-.423-.015-.633A10.025 10.025 0 0024 4.557z" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-sm border border-background/15 flex items-center justify-center text-background/60 hover:text-primary hover:border-primary/40 transition-colors" aria-label="Instagram">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.337 3.608 1.312.975.975 1.25 2.242 1.312 3.608.058 1.266.07 1.646.07 4.851s-.012 3.584-.07 4.85c-.062 1.366-.337 2.633-1.312 3.608-.975.975-2.242 1.25-3.608 1.312-1.266.058-1.646.07-4.851.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.337-3.608-1.312-.975-.975-1.25-2.242-1.312-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.337-2.633 1.312-3.608C4.52 2.5 5.787 2.225 7.153 2.163 8.419 2.105 8.799 2.163 12 2.163zm0-2.163C8.755 0 8.332.014 7.052.072 5.75.131 4.557.421 3.513 1.465 2.469 2.509 2.179 3.702 2.12 5.004.063 8.332 0 8.755 0 12s.063 3.668.072 4.948c.059 1.302.349 2.495 1.393 3.539 1.044 1.044 2.237 1.334 3.539 1.393 1.28.058 1.703.072 4.948.072s3.668-.014 4.948-.072c1.302-.059 2.495-.349 3.539-1.393 1.044-1.044 1.334-2.237 1.393-3.539.058-1.28.072-1.703.072-4.948s-.014-3.668-.072-4.948c-.059-1.302-.349-2.495-1.393-3.539-1.044-1.044-2.237-1.334-3.539-1.393C15.668.014 15.245 0 12 0z" />
                  <circle cx="12" cy="12" r="3.6" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary mb-5">Services</h4>
            <ul className="space-y-3 text-sm font-light">
              <li><Link to="/vendre" className="text-background/75 hover:text-background transition-colors">Vendre mes plastiques</Link></li>
              <li><Link to="/enlevement" className="text-background/75 hover:text-background transition-colors">Enlèvement déchets</Link></li>
              <li><Link to="/alerte" className="text-background/75 hover:text-background transition-colors">Alerte dépotoir</Link></li>
              <li><Link to="/academy" className="text-background/75 hover:text-background transition-colors">Green Academy</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary mb-5">Découvrir</h4>
            <ul className="space-y-3 text-sm font-light">
              <li><Link to="/evenements" className="text-background/75 hover:text-background transition-colors">Événements</Link></li>
              <li><Link to="/connexion" className="text-background/75 hover:text-background transition-colors">Connexion</Link></li>
              <li><Link to="/inscription" className="text-background/75 hover:text-background transition-colors">S'inscrire</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary mb-5">Contact</h4>
            <address className="not-italic space-y-3 text-sm font-light">
              <div className="flex items-start gap-3 text-background/75">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                Kara, Préfecture de Kozah
              </div>
              <a href="tel:+22897684030" className="flex items-start gap-3 text-background/75 hover:text-background transition-colors">
                <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                +228 97 68 40 30
              </a>
              <a href="mailto:recychubtogo@gmail.com" className="flex items-start gap-3 text-background/75 hover:text-background transition-colors">
                <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                recychubtogo@gmail.com
              </a>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-background/45 font-light">
          <div>© {year} RECYC HUB TOGO — Tous droits réservés.</div>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-background/80 transition-colors">Mentions légales</Link>
            <Link to="/" className="hover:text-background/80 transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
