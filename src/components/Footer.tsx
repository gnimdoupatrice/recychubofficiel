import { Recycle, Phone, MapPin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80 py-14">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Recycle className="w-6 h-6 text-accent" />
              <span className="font-display font-bold text-lg text-background">RecycHub Togo</span>
            </div>
            <p className="text-sm text-background/60">
              Plateforme phygitale de gestion des déchets et de sensibilisation environnementale à Kara, Togo.
            </p>
          </div>
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
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" /> Kara, Préfecture de Kozah</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-accent" /> +228 XX XX XX XX</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent" /> contact@recychub.tg</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/10 mt-10 pt-6 text-center text-xs text-background/40">
          © 2026 RecycHub Togo. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
