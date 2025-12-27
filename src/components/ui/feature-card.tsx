import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  index?: number;
}

export function FeatureCard({ icon, title, description, className, index = 0 }: FeatureCardProps) {
  return (
    <div
      className={cn(
        'elevated-card p-6 lg:p-8 opacity-0 animate-fade-up',
        className
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 text-primary">
        {icon}
      </div>
      <h3 className="text-title-1 text-foreground mb-2">{title}</h3>
      <p className="text-body text-muted-foreground">{description}</p>
    </div>
  );
}

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
  className?: string;
}

export function ProcessStep({ number, title, description, isLast = false, className }: ProcessStepProps) {
  return (
    <div className={cn('relative flex gap-6', className)}>
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-6 top-14 w-0.5 h-full bg-border -translate-x-1/2" />
      )}
      
      {/* Step number */}
      <div className="relative z-10 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-title-2 flex-shrink-0 shadow-glow">
        {number}
      </div>
      
      {/* Content */}
      <div className="pb-12">
        <h3 className="text-title-1 text-foreground mb-2">{title}</h3>
        <p className="text-body text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div className={cn('text-center', className)}>
      <div className="text-display-2 lg:text-display-1 font-bold text-foreground mb-2">
        {value}
      </div>
      <p className="text-body text-muted-foreground">{label}</p>
    </div>
  );
}
