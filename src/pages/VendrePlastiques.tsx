import { ShoppingBag, MapPin, Weight, Camera, Send, Info } from "lucide-react";

const VendrePlastiques = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <ShoppingBag className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Vente</span>
          </div>
          <h1 className="font-display text-4xl font-bold mb-4">
            Vendre mes <span className="text-gradient-emerald">plastiques</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Vendez vos déchets plastiques et générez un revenu complémentaire.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 flex items-start gap-3 mb-6">
            <Info className="w-5 h-5 text-accent mt-0.5 shrink-0" />
            <div className="text-sm">
              <strong className="text-accent">Prix actuel :</strong>{" "}
              <span className="text-foreground">100 FCFA / kg de plastique</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Repère / Lieu de collecte *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Ex: Devant maison bleue, rue du marché"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Quantité (kg) *</label>
              <div className="relative">
                <Weight className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type="number"
                  min="1"
                  placeholder="Ex: 5"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Photo (optionnelle)</label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/40 transition-colors">
                <Camera className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Ajouter une photo de vos plastiques</p>
              </div>
            </div>
            <button className="w-full shimmer py-3 rounded-xl gradient-bio text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] glow-emerald">
              <Send className="w-4 h-4" />
              Proposer la vente
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Vous devez être connecté pour proposer une vente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendrePlastiques;
