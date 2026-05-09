import type { ServiceFlow } from "./serviceData";

interface ServiceTabsProps {
  services: ServiceFlow[];
  activeService: number;
  onSelect: (index: number) => void;
}

const ServiceTabs = ({ services, activeService, onSelect }: ServiceTabsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
      {services.map((service, i) => {
        const Icon = service.icon;
        const isActive = i === activeService;
        return (
          <button
            key={service.id}
            onClick={() => onSelect(i)}
            className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border ${
              isActive
                ? "bg-gradient-to-r from-primary to-accent text-primary-foreground border-transparent shadow-lg shadow-primary/20 scale-105"
                : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground hover:shadow-md"
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? "text-primary-foreground" : "text-primary"}`} />
            <span className="hidden sm:inline">{service.label}</span>
            <span className="sm:hidden">{service.label.split(" ")[0]}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ServiceTabs;
