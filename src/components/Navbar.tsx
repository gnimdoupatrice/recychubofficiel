import { Recycle, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Recycle className="h-7 w-7 text-accent" />
          <span className="font-display font-bold text-lg text-foreground">
            RECYCLAGE HUB <span className="text-accent">TOGO</span>
          </span>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#poles" className="hover:text-foreground transition-colors">Nos Pôles</a>
          <a href="#impact" className="hover:text-foreground transition-colors">Impact</a>
          <a href="#events" className="hover:text-foreground transition-colors">Événements</a>
          <a href="#academy" className="hover:text-foreground transition-colors">Green Academy</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-card border-b border-border px-6 pb-4 flex flex-col gap-3 text-sm font-medium text-muted-foreground">
          <a href="#poles" onClick={() => setOpen(false)} className="hover:text-foreground">Nos Pôles</a>
          <a href="#impact" onClick={() => setOpen(false)} className="hover:text-foreground">Impact</a>
          <a href="#events" onClick={() => setOpen(false)} className="hover:text-foreground">Événements</a>
          <a href="#academy" onClick={() => setOpen(false)} className="hover:text-foreground">Green Academy</a>
          <a href="#contact" onClick={() => setOpen(false)} className="hover:text-foreground">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
