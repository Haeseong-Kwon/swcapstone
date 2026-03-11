import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'black';
    size?: 'sm' | 'md' | 'lg';
    children: ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...props
}: ButtonProps) {
    const variants = {
        primary: 'bg-primary text-white hover:opacity-90',
        secondary: 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-50 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700',
        outline: 'border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-50 hover:bg-slate-50 dark:hover:bg-slate-800',
        ghost: 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50',
        black: 'bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 hover:opacity-90',
    };

    const sizes = {
        sm: 'px-5 py-2 text-xs font-bold',
        md: 'px-8 py-3 text-[13px] font-bold',
        lg: 'px-12 py-4 text-base font-bold',
    };

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center rounded-full premium-transition disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-[0.1em]',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
