import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, Recycle, Sprout, Award } from "lucide-react";
import heroImg from "@/assets/academy-hero.jpg";

const tracks = [
  {
    icon: Recycle,
    title: "Tri & recyclage",
    desc: "Maîtriser l'identification, le tri et la valorisation des plastiques.",
  },
  {
    icon: Sprout,
    title: "Économie circulaire",
    desc: "Comprendre les chaînes de valeur et les modèles régénératifs.",
  },
  {
    icon: BookOpen,
    title: "Entrepreneuriat vert",
    desc: "Lancer une activité durable autour des métiers de l'environnement.",
  },
];

const stats = [
  { value: "24", label: "modules disponibles" },
  { value: "+450", label: "apprenants certifiés" },
  { value: "92%", label: "taux de complétion" },
];

const GreenAcademySection = () => (
  <section
    id="green-academy"
    className="relative bg-background py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
  >
    <div className="max-w-7xl mx-auto relative grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      {/* Visual column */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-5 relative order-2 lg:order-1"
      >
        <div className="relative rounded-[2rem] overflow-hidden">
          <img
            src={heroImg}
            alt="Atelier de formation Green Academy au Togo"
            loading="lazy"
            width={1600}
            height={1024}
            className="w-full h-[420px] md:h-[560px] object-cover"
          />
        </div>

        {/* Floating certification badge */}
        <div className="absolute -bottom-6 -right-2 md:-right-6 bg-primary text-primary-foreground rounded-2xl px-5 py-4 shadow-[0_20px_50px_-20px_hsl(var(--primary)/0.6)] max-w-[200px]">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-4 h-4" />
            <span className="text-[10px] font-bold tracking-widest uppercase">
              Certifications
            </span>
          </div>
          <div className="text-sm font-bold leading-snug">
            Reconnues localement
          </div>
        </div>

        {/* Stats chip */}
        <div className="absolute -top-4 -left-2 md:-left-6 bg-background rounded-2xl shadow-[0_20px_50px_-20px_hsl(var(--foreground)/0.25)] border border-border px-5 py-3 flex items-center gap-4">
          {stats.slice(0, 2).map((s) => (
            <div key={s.label}>
              <div className="font-black text-xl text-primary leading-none">
                {s.value}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
                {s.label.split(" ")[0]}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Content column */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="lg:col-span-7 order-1 lg:order-2"
      >
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-black text-sm">
            03
          </span>
          <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary">
            Green Academy
          </span>
        </div>

        <h2 className="font-black text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.05] tracking-tight mb-6">
          Former la prochaine génération{" "}
          <span className="text-primary">du recyclage</span>.
        </h2>

        <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl">
          Une académie verte qui outille étudiants, jeunes professionnels et
          collecteurs en activité. Modules digitaux, ateliers pratiques sur le
          terrain et certifications reconnues : le savoir au service de la
          transition écologique togolaise.
        </p>

        <div className="grid sm:grid-cols-3 gap-3 mb-10">
          {tracks.map((t) => (
            <div
              key={t.title}
              className="p-5 rounded-2xl bg-muted/60 hover:bg-primary/8 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-background text-primary flex items-center justify-center mb-3 shadow-sm">
                <t.icon className="w-5 h-5" />
              </div>
              <div className="font-black text-foreground mb-1.5 leading-snug">
                {t.title}
              </div>
              <div className="text-[13px] text-muted-foreground leading-relaxed">
                {t.desc}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to="/academy" className="btn-cta px-6 py-3">
            Explorer les formations
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            to="/academy#ambassadeurs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm border-2 border-foreground/15 text-foreground hover:border-foreground/40 transition-colors"
          >
            Devenir ambassadeur
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default GreenAcademySection;
