import { Truck, MapPin, Send, CheckCircle } from "lucide-react";

const DemanderEnlevement = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Truck className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Collecte</span>
          </div>
          <h1 className="font-display text-4xl font-bold mb-4">
            Demander un <span className="text-gradient-emerald">enlèvement</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Un agent de collecte passera chez vous dans les 48h suivant votre demande.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="flex gap-3 mb-6">
            {["Rapide", "Gratuit", "Écologique"].map((t) => (
              <div key={t} className="flex items-center gap-1 text-sm text-accent">
                <CheckCircle className="w-4 h-4" />
                {t}
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl glass space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Repère / Lieu précis *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Ex: Devant la pharmacie, Kozah 3"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none"
                />
              </div>
            </div>
            <button className="w-full shimmer py-3 rounded-xl gradient-bio text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] glow-emerald">
              <Send className="w-4 h-4" />
              Envoyer la demande
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Votre profil (pseudo, téléphone, commune, quartier) sera attaché automatiquement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemanderEnlevement;
