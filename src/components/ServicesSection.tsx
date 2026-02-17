import { Truck, ShoppingBag, AlertTriangle, GraduationCap, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Truck,
    title: "Enlèvement déchets",
    desc: "Demandez un ramassage de vos déchets ménagers directement depuis chez vous dans Kozah 1–4.",
    to: "/enlevement",
    color: "primary",
  },
  {
    icon: ShoppingBag,
    title: "Vente plastiques",
    desc: "Vendez vos déchets plastiques au kilo. Prix transparent : 100 FCFA/kg minimum.",
    to: "/vendre",
    color: "accent",
  },
  {
    icon: AlertTriangle,
    title: "Alerte dépotoir",
    desc: "Signalez un dépotoir sauvage avec photo. Contribuez à un Kara plus propre.",
    to: "/alerte",
    isAlert: true,
  },
  {
    icon: GraduationCap,
    title: "Green Academy",
    desc: "Cours sur l'économie circulaire, les métiers verts et l'environnement. Certifications incluses.",
    to: "/academy",
    color: "primary",
  },
  {
    icon: CalendarDays,
    title: "Hub Événementiel",
    desc: "Calendrier des opportunités, jobs verts, et événements éco à Kara.",
    to: "/evenements",
    color: "accent",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Nos <span className="text-gradient-emerald">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Une plateforme complète pour transformer la gestion des déchets à Kara.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Link
              to={s.to}
              key={s.title}
              className={`group relative p-6 rounded-2xl glass transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${
                s.isAlert ? "glow-orange" : "hover:glow-emerald"
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  s.isAlert
                    ? "bg-orange-alert/10 text-orange-alert animate-pulse-orange"
                    : "gradient-bio text-primary-foreground"
                }`}
              >
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {s.title}
              </h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
