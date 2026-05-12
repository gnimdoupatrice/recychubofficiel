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
    className="relative min-h-screen bg-white flex items-center py-24 md:py-32 px-6 md:px-12 lg:px-24 font-inter overflow-hidden"
  >
    <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="lg:col-span-6"
      >
        <div className="flex items-center gap-4 mb-8">
          <span className="font-editorial font-bold text-7xl text-primary/15 leading-none">
            03
          </span>
          <div className="h-px flex-1 bg-foreground/15" />
          <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-primary">
            Green Academy
          </span>
        </div>

        <h2 className="font-editorial font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.05] mb-6">
          Former la prochaine génération{" "}
          <span className="italic text-primary">du recyclage</span>.
        </h2>

        <p className="text-muted-foreground font-light text-lg leading-relaxed max-w-xl mb-10">
          Une académie verte qui outille étudiants, jeunes professionnels et
          collecteurs en activité. Modules digitaux, ateliers pratiques sur le
          terrain et certifications reconnues : le savoir au service de la
          transition écologique togolaise.
        </p>

        <div className="space-y-6 mb-10 max-w-xl">
          {tracks.map((t) => (
            <div key={t.title} className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-sm bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <t.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-editorial font-bold text-lg text-foreground mb-1">
                  {t.title}
                </div>
                <div className="text-[15px] text-muted-foreground font-light leading-relaxed">
                  {t.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 mb-10 max-w-xl border-y border-foreground/10 py-6">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-editorial font-bold text-3xl md:text-4xl text-primary">
                {s.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1 leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/academy"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Explorer les formations
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            to="/academy#ambassadeurs"
            className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-3 rounded-sm font-semibold text-sm hover:bg-foreground/5 transition-colors"
          >
            Devenir ambassadeur
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="lg:col-span-6"
      >
        <div className="relative shadow-[20px_20px_0_0_hsl(var(--primary)/0.18)] rounded-sm overflow-hidden">
          <img
            src={heroImg}
            alt="Atelier de formation Green Academy au Togo"
            loading="lazy"
            width={1600}
            height={1024}
            className="w-full h-[420px] md:h-[560px] object-cover"
          />
          <div className="absolute bottom-6 left-6 bg-foreground text-background px-5 py-3 rounded-sm shadow-lg">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold tracking-[0.15em] uppercase">
                Certifications reconnues
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default GreenAcademySection;
