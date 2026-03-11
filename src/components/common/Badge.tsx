import { cn } from "@/lib/utils";

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'info';
    className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
    const variants = {
        default: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 border border-slate-200 dark:border-slate-700',
        primary: 'border border-primary text-primary dark:text-blue-400 bg-primary/5 dark:bg-primary/20 dark:border-blue-400',
        success: 'border border-green-600 dark:border-green-500 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30',
        warning: 'border border-amber-600 dark:border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30',
        info: 'border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30',
    };

    return (
        <span className={cn(
            "inline-flex items-center px-4 py-1 rounded-none text-[10px] font-bold uppercase tracking-widest",
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
}
