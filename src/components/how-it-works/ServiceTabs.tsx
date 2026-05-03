import type { ServiceFlow } from "./serviceData";

interface ServiceTabsProps {
  services: ServiceFlow[];
  activeService: number;
  onSelect: (index: number) => void;
}

const ServiceTabs = ({ services, activeService, onSelect }: ServiceTabsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {services.map((service, i) => {
        const Icon = service.icon;
        const isActive = i === activeService;
        return (
          <button
            key={service.id}
            onClick={() => onSelect(i)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-extrabold uppercase tracking-[0.15em] border-2 border-foreground transition-all duration-200 ${
              isActive
                ? "bg-primary text-primary-foreground translate-x-[-2px] translate-y-[-2px]"
                : "bg-background text-foreground hover:bg-foreground hover:text-background"
            }`}
            style={{
              boxShadow: isActive
                ? "5px 5px 0 0 hsl(var(--foreground))"
                : "3px 3px 0 0 hsl(var(--foreground))",
            }}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{service.label}</span>
            <span className="sm:hidden">{service.label.split(" ")[0]}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ServiceTabs;
