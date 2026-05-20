/**
 * ManifestoSection — bloc éditorial centré, voix de marque.
 * Sert de pivot entre les actions et le storytelling (about, impact…).
 */
const ManifestoSection = () => {
  return (
    <section className="relative section-spacing-lg surface-ink grain overflow-hidden">
      {/* Filets éditoriaux */}
      <div className="absolute inset-x-6 md:inset-x-10 lg:inset-x-16 top-0 border-t border-cream/10" aria-hidden />
      <div className="absolute inset-x-6 md:inset-x-10 lg:inset-x-16 bottom-0 border-t border-cream/10" aria-hidden />

      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-3">
            <span className="eyebrow text-cream/60">Manifeste</span>
            <div className="mt-4 font-display italic text-cream/50 text-sm">— N°02</div>
          </div>

          <div className="md:col-span-9">
            <p className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-cream">
              Nous croyons qu’une ville propre n’est pas un slogan,
              <em className="italic text-primary"> c’est une économie</em>. Que chaque sachet ramassé est
              un revenu rendu, chaque tournée optimisée un litre d’essence sauvé, chaque dépotoir
              signalé une victoire collective.
            </p>

            <div className="mt-10 grid sm:grid-cols-3 gap-8 text-cream/75 text-sm leading-relaxed">
              <div>
                <div className="font-display text-5xl text-cream">2 500<span className="text-primary">+</span></div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-cream/55">kg de plastiques collectés</div>
              </div>
              <div>
                <div className="font-display text-5xl text-cream">12<span className="text-primary">·</span></div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-cream/55">quartiers couverts à Kara</div>
              </div>
              <div>
                <div className="font-display text-5xl text-cream">5<span className="text-primary">.</span></div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-cream/55">actions phares, une plateforme</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
