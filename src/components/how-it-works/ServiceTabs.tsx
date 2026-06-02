import type { ServiceFlow } from "./serviceData";

interface ServiceTabsProps {
  services: ServiceFlow[];
  activeService: number;
  onSelect: (index: number) => void;
}

const ServiceTabs = ({ services, activeService, onSelect }: ServiceTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {services.map((service, i) => {
        const Icon = service.icon;
        const isActive = i === activeService;
        return (
          <button
            key={service.id}
            onClick={() => onSelect(i)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border-2 ${
              isActive
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-foreground border-border hover:border-foreground/40"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{service.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ServiceTabs;
