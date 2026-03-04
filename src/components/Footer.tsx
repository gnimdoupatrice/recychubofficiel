import { Recycle, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer id="contact" className="bg-foreground text-primary-foreground/80 pt-16 pb-8">
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Recycle className="h-6 w-6 text-accent" />
              <span className="font-display font-bold text-lg text-primary-foreground">
                RECYCLAGE HUB TOGO
              </span>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/60">
              Plateforme nationale dédiée au recyclage, à la valorisation des déchets et aux opportunités vertes au Togo.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="font-bold text-primary-foreground mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#poles" className="hover:text-accent transition-colors">Nos Pôles</a></li>
              <li><a href="#impact" className="hover:text-accent transition-colors">Impact</a></li>
              <li><a href="#events" className="hover:text-accent transition-colors">Événements</a></li>
              <li><a href="#academy" className="hover:text-accent transition-colors">Green Academy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Mentions légales</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-primary-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> contact@recyclagehub.tg</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> +228 90 00 00 00</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Lomé, Togo</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-primary-foreground mb-4">Newsletter</h4>
            <p className="text-sm text-primary-foreground/60 mb-3">Restez informé de nos actualités vertes.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-lg px-3 py-2 text-sm bg-primary-foreground/10 border border-primary-foreground/20 placeholder:text-primary-foreground/40 text-primary-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <Button variant="hero" size="sm">OK</Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/40">
          <p>© 2026 Recyclage Hub Togo. Tous droits réservés.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-accent transition-colors">Facebook</a>
            <a href="#" className="hover:text-accent transition-colors">Twitter</a>
            <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-accent transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
