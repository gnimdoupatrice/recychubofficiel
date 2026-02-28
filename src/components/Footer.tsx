import { Recycle, Phone, MapPin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80 py-14">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* logo + description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Recycle className="w-6 h-6 text-accent" aria-hidden="true" />
              <span className="font-display font-bold text-lg text-background">RECYC HUB TOGO</span>
            </div>
            <p className="text-sm text-background/60">
              Plateforme phygitale de gestion des déchets et de sensibilisation environnementale à Kara, Togo.
            </p>
            {/* social icons */}
            <div className="flex gap-3 mt-4" aria-label="Suivez-nous">
              <a href="#" className="text-background/60 hover:text-accent transition-colors" aria-label="Facebook">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54v-2.89h2.54V9.797c0-2.507 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-background/60 hover:text-accent transition-colors" aria-label="Twitter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.555-2.005.959-3.127 1.184a4.918 4.918 0 00-8.384 4.482c-4.086-.205-7.713-2.164-10.141-5.144a4.822 4.822 0 00-.666 2.475c0 1.708.869 3.214 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.925 4.925 0 003.946 4.827 4.997 4.997 0 01-2.224.084 4.928 4.928 0 004.6 3.417 9.868 9.868 0 01-6.102 2.103c-.395 0-.785-.023-1.17-.069a13.945 13.945 0 007.548 2.212c9.057 0 14.01-7.496 14.01-13.986 0-.21-.005-.423-.015-.633A10.025 10.025 0 0024 4.557z" />
                </svg>
              </a>
              <a href="#" className="text-background/60 hover:text-accent transition-colors" aria-label="Instagram">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.337 3.608 1.312.975.975 1.25 2.242 1.312 3.608.058 1.266.07 1.646.07 4.851s-.012 3.584-.07 4.85c-.062 1.366-.337 2.633-1.312 3.608-.975.975-2.242 1.25-3.608 1.312-1.266.058-1.646.07-4.851.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.337-3.608-1.312-.975-.975-1.25-2.242-1.312-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.337-2.633 1.312-3.608C4.52 2.5 5.787 2.225 7.153 2.163 8.419 2.105 8.799 2.163 12 2.163zm0-2.163C8.755 0 8.332.014 7.052.072 5.75.131 4.557.421 3.513 1.465 2.469 2.509 2.179 3.702 2.12 5.004.063 8.332 0 8.755 0 12s.063 3.668.072 4.948c.059 1.302.349 2.495 1.393 3.539 1.044 1.044 2.237 1.334 3.539 1.393 1.28.058 1.703.072 4.948.072s3.668-.014 4.948-.072c1.302-.059 2.495-.349 3.539-1.393 1.044-1.044 1.334-2.237 1.393-3.539.058-1.28.072-1.703.072-4.948s-.014-3.668-.072-4.948c-.059-1.302-.349-2.495-1.393-3.539-1.044-1.044-2.237-1.334-3.539-1.393C15.668.014 15.245 0 12 0z" />
                  <circle cx="12" cy="12" r="3.6" />
                </svg>
              </a>
            </div>
          </div>
          {/* navigation */}
          <div>
            <h4 className="font-display font-semibold text-background mb-3">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/enlevement" className="hover:text-accent transition-colors">Enlèvement déchets</Link></li>
              <li><Link to="/vendre" className="hover:text-accent transition-colors">Vente plastiques</Link></li>
              <li><Link to="/alerte" className="hover:text-accent transition-colors">Alerte dépotoir</Link></li>
              <li><Link to="/academy" className="hover:text-accent transition-colors">Green Academy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-background mb-3">Liens</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/evenements" className="hover:text-accent transition-colors">Événements</Link></li>
              <li><Link to="/connexion" className="hover:text-accent transition-colors">Connexion</Link></li>
              <li><Link to="/inscription" className="hover:text-accent transition-colors">S'inscrire</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-background mb-3">Contact</h4>
            <address className="not-italic space-y-2 text-sm">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" aria-hidden="true" /> Kara, Préfecture de Kozah</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-accent" aria-hidden="true" /> <a href="tel:+22897684030" className="hover:text-accent transition-colors">+228 97684030</a></div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent" aria-hidden="true" /> <a href="mailto:recychubtogo@gmail.com" className="hover:text-accent transition-colors">recychubtogo@gmail.com</a></div>
            </address>
          </div>
        </div>
        {/* newsletter */}
        <div className="mt-12 text-center">
          <form className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-2">
            <label htmlFor="newsletter" className="sr-only">Inscrivez-vous à la newsletter</label>
            <input
              id="newsletter"
              type="email"
              placeholder="Votre email"
              className="w-full px-4 py-2 rounded-lg bg-background/10 placeholder-background/40 text-background focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button type="submit" className="mt-2 sm:mt-0 sm:ml-2 px-6 py-2 bg-accent text-background font-semibold rounded-lg hover:bg-accent/90 transition-colors">
              S'abonner
            </button>
          </form>
        </div>
        <div className="border-t border-background/10 mt-10 pt-6 text-center text-xs text-background/40">
          © {new Date().getFullYear()} RECYC HUB TOGO. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
