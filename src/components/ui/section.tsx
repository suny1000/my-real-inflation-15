import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'default' | 'surface' | 'muted';
}

export function Section({ children, className, id, background = 'default' }: SectionProps) {
  const bgClasses = {
    default: 'bg-background',
    surface: 'bg-surface',
    muted: 'bg-muted',
  };
  
  return (
    <section id={id} className={cn('py-20 lg:py-28', bgClasses[background], className)}>
      <div className="section-container">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({ title, subtitle, badge, align = 'center', className }: SectionHeaderProps) {
  return (
    <div className={cn(
      'max-w-3xl mb-12 lg:mb-16',
      align === 'center' && 'mx-auto text-center',
      className
    )}>
      {badge && (
        <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-small font-medium">
          {badge}
        </span>
      )}
      <h2 className="text-display-3 lg:text-display-2 text-foreground mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-body-lg text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
