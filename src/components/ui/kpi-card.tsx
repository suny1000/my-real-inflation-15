import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  suffix?: string;
  prefix?: string;
  change?: number;
  changeLabel?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendPositive?: 'up' | 'down'; // which direction is positive
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'muted';
  icon?: React.ReactNode;
  animate?: boolean;
}

export function KPICard({
  title,
  value,
  suffix = '',
  prefix = '',
  change,
  changeLabel,
  trend,
  trendPositive = 'up',
  className,
  size = 'md',
  variant = 'default',
  icon,
  animate = true,
}: KPICardProps) {
  const isPositive = trend === trendPositive;
  const isNegative = trend && trend !== 'neutral' && trend !== trendPositive;
  
  const TrendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : Minus;
  
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const valueSizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
  };
  
  const variantClasses = {
    default: 'bg-card border border-border/30',
    primary: 'bg-primary text-primary-foreground',
    muted: 'bg-muted',
  };
  
  return (
    <div
      className={cn(
        'rounded-2xl shadow-apple-md transition-all duration-300',
        sizeClasses[size],
        variantClasses[variant],
        animate && 'hover:shadow-apple-lg hover:-translate-y-0.5',
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <p className={cn(
          'text-caption font-medium',
          variant === 'primary' ? 'text-primary-foreground/80' : 'text-muted-foreground'
        )}>
          {title}
        </p>
        {icon && (
          <div className={cn(
            'p-2 rounded-xl',
            variant === 'primary' ? 'bg-primary-foreground/10' : 'bg-primary/10'
          )}>
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-baseline gap-1">
        {prefix && (
          <span className={cn(
            'text-title-2',
            variant === 'primary' ? 'text-primary-foreground/80' : 'text-muted-foreground'
          )}>
            {prefix}
          </span>
        )}
        <span className={cn(
          'font-bold tracking-tight',
          valueSizeClasses[size],
          variant === 'primary' ? 'text-primary-foreground' : 'text-foreground'
        )}>
          {value}
        </span>
        {suffix && (
          <span className={cn(
            'text-title-2',
            variant === 'primary' ? 'text-primary-foreground/80' : 'text-muted-foreground'
          )}>
            {suffix}
          </span>
        )}
      </div>
      
      {(change !== undefined || changeLabel) && (
        <div className="flex items-center gap-2 mt-3">
          {trend && (
            <div className={cn(
              'flex items-center gap-1 px-2 py-1 rounded-full text-small font-medium',
              isPositive && 'bg-success/10 text-success',
              isNegative && 'bg-destructive/10 text-destructive',
              trend === 'neutral' && 'bg-muted text-muted-foreground'
            )}>
              <TrendIcon className="w-3 h-3" />
              {change !== undefined && (
                <span>{change > 0 ? '+' : ''}{change.toFixed(1)}%</span>
              )}
            </div>
          )}
          {changeLabel && (
            <span className={cn(
              'text-small',
              variant === 'primary' ? 'text-primary-foreground/60' : 'text-muted-foreground'
            )}>
              {changeLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
