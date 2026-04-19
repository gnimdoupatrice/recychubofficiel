import { BookOpen, Play, Award, TrendingUp } from "lucide-react";
import SEO from "@/components/SEO";

const modules = [
  { title: "Introduction à l'économie circulaire", duration: "15 min", type: "Vidéo", free: true },
  { title: "Tri des déchets ménagers", duration: "20 min", type: "Texte", free: true },
  { title: "Métiers verts au Togo", duration: "25 min", type: "Vidéo", free: true },
  { title: "Compostage domestique", duration: "30 min", type: "Vidéo", free: false },
  { title: "Entrepreneuriat vert", duration: "45 min", type: "Cours", free: false },
];

const GreenAcademy = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <SEO title="Green Academy — Formations économie circulaire" description="Apprenez le tri, le compostage et les métiers verts au Togo. Modules vidéo et certifications via la Green Academy de RecycHub Togo." path="/academy" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Formation</span>
          </div>
          <h1 className="font-display text-4xl font-bold mb-4">
            Green <span className="text-gradient-emerald">Academy</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Apprenez les métiers verts, l'économie circulaire et contribuez à un avenir durable.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-12">
          {[
            { icon: Play, val: "12", label: "Modules" },
            { icon: Award, val: "3", label: "Certifications" },
            { icon: TrendingUp, val: "150+", label: "Apprenants" },
          ].map((s) => (
            <div key={s.label} className="text-center p-4 rounded-xl glass">
              <s.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="font-display text-xl font-bold text-primary">{s.val}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Modules */}
        <div className="max-w-2xl mx-auto space-y-4">
          {modules.map((m, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-xl glass hover:glow-emerald transition-all duration-300 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg gradient-bio flex items-center justify-center text-primary-foreground shrink-0">
                <Play className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{m.title}</h3>
                <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                  <span>{m.duration}</span>
                  <span>{m.type}</span>
                </div>
              </div>
              {m.free ? (
                <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">Gratuit</span>
              ) : (
                <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium">Premium</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GreenAcademy;
