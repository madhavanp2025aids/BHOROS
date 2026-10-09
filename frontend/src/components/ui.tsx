import React from 'react';
import type { LucideIcon } from 'lucide-react';

/* ─────────────────────── Page Header ─────────────────────── */
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumb?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, actions, breadcrumb }) => (
  <div>
    {breadcrumb && <div className="mb-3">{breadcrumb}</div>}
    <div className="flex items-end justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-text-main tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-text-muted mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  </div>
);

/* ─────────────────────── KPI Card ─────────────────────── */
interface KpiCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: 'up' | 'down' | 'flat';
}

export const KpiCard: React.FC<KpiCardProps> = ({ label, value, unit, icon: Icon, iconColor = 'text-primary' }) => (
  <div className="bg-background border border-border rounded-lg p-5">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs font-medium text-text-muted uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-semibold text-text-main mt-1.5 font-mono tabular-nums">
          {value}
          {unit && <span className="text-sm text-text-muted font-sans ml-1">{unit}</span>}
        </p>
      </div>
      <div className={`p-2 rounded-md ${iconColor} bg-current/8`}>
        <Icon size={18} className={iconColor} />
      </div>
    </div>
  </div>
);

/* ─────────────────────── Panel ─────────────────────── */
interface PanelProps {
  title: string;
  icon?: LucideIcon;
  iconColor?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
  noPadding?: boolean;
}

export const Panel: React.FC<PanelProps> = ({ title, icon: Icon, iconColor = 'text-primary', badge, children, noPadding }) => (
  <div className="bg-background border border-border rounded-lg overflow-hidden">
    <div className="px-5 py-3.5 border-b border-border flex justify-between items-center">
      <h3 className="text-sm font-semibold text-text-main flex items-center gap-2">
        {Icon && <Icon size={16} className={iconColor} />}
        {title}
      </h3>
      {badge}
    </div>
    <div className={noPadding ? '' : 'p-5'}>{children}</div>
  </div>
);

/* ─────────────────────── Metric Row ─────────────────────── */
interface MetricProps {
  label: string;
  value: string | number;
  unit?: string;
  alert?: boolean;
}

export const Metric: React.FC<MetricProps> = ({ label, value, unit, alert }) => (
  <div>
    <p className="text-xs text-text-muted uppercase tracking-wider">{label}</p>
    <p className={`text-lg font-mono font-medium mt-0.5 tabular-nums ${alert ? 'text-status-critical' : 'text-text-main'}`}>
      {value}
      {unit && <span className="text-xs text-text-muted font-sans ml-1">{unit}</span>}
    </p>
  </div>
);

/* ─────────────────────── Status Badge ─────────────────────── */
type SeverityLevel = 'active' | 'info' | 'warning' | 'critical';

const severityStyles: Record<SeverityLevel, string> = {
  active: 'status-active',
  info: 'status-info',
  warning: 'status-warning',
  critical: 'status-critical',
};

interface StatusBadgeProps {
  label: string;
  severity: SeverityLevel;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ label, severity }) => (
  <span className={`status-indicator ${severityStyles[severity]}`}>{label}</span>
);

/* ─────────────────────── Demo Mode Tag ─────────────────────── */
export const DemoTag: React.FC = () => (
  <span className="text-[10px] bg-content px-2 py-0.5 rounded text-text-muted font-mono border border-border uppercase tracking-widest">
    Demo Data
  </span>
);

/* ─────────────────────── Buttons ─────────────────────── */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
  icon?: LucideIcon;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', icon: Icon, children, className = '', ...rest }) => {
  const base = 'inline-flex items-center justify-center gap-1.5 font-medium rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
  const sizes = size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm';
  const variants: Record<string, string> = {
    primary: 'bg-primary text-white hover:bg-primary-hover',
    secondary: 'bg-background border border-border text-text-main hover:bg-content',
    ghost: 'text-text-muted hover:text-text-main hover:bg-content',
  };

  return (
    <button className={`${base} ${sizes} ${variants[variant]} ${className}`} {...rest}>
      {Icon && <Icon size={size === 'sm' ? 14 : 16} />}
      {children}
    </button>
  );
};

/* ─────────────────────── Empty State ─────────────────────── */
interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, message }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <Icon size={40} className="text-border mb-3" />
    <p className="text-sm font-medium text-text-main">{title}</p>
    <p className="text-xs text-text-muted mt-1 max-w-xs">{message}</p>
  </div>
);

/* ─────────────────────── Alert Banner ─────────────────────── */
interface AlertBannerProps {
  severity: 'warning' | 'critical' | 'info';
  title: string;
  message: string;
  icon?: LucideIcon;
}

const alertColors: Record<string, string> = {
  warning: 'bg-status-warning/8 border-status-warning/20 text-status-warning',
  critical: 'bg-status-critical/8 border-status-critical/20 text-status-critical',
  info: 'bg-status-info/8 border-status-info/20 text-status-info',
};

export const AlertBanner: React.FC<AlertBannerProps> = ({ severity, title, message, icon: Icon }) => (
  <div className={`border rounded-lg p-4 flex items-start gap-3 ${alertColors[severity]}`}>
    {Icon && <Icon className="shrink-0 mt-0.5" size={18} />}
    <div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <p className="text-xs mt-0.5 opacity-80">{message}</p>
    </div>
  </div>
);
