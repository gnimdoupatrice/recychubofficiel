import { AlertTriangle, Camera, MapPin, Send } from "lucide-react";

const AlerteDepotoir = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 animate-pulse-orange">
            <AlertTriangle className="w-4 h-4 text-orange-alert" />
            <span className="text-sm font-medium text-orange-alert">Signalement</span>
          </div>
          <h1 className="font-display text-4xl font-bold mb-4">
            Alerte <span className="text-orange-alert">Dépotoir</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Signalez un dépotoir sauvage dans votre quartier. Ensemble, rendons Kara plus propre.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="p-6 rounded-2xl glass space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Photo du dépotoir *</label>
              <div className="border-2 border-dashed border-orange-alert/30 rounded-xl p-8 text-center cursor-pointer hover:border-orange-alert/60 transition-colors">
                <Camera className="w-10 h-10 text-orange-alert/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Prendre une photo ou choisir depuis la galerie</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Repère / Lieu précis *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Ex: Derrière le marché central, Kozah 2"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none"
                />
              </div>
            </div>
            <button className="w-full shimmer py-3 rounded-xl bg-orange-alert text-destructive-foreground font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] glow-orange">
              <Send className="w-4 h-4" />
              Envoyer l'alerte
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Connectez-vous pour suivre vos alertes. Les alertes anonymes sont aussi acceptées.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlerteDepotoir;
