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
        secondary: 'bg-muted/10 text-foreground border border-border hover:bg-muted/20',
        outline: 'border border-border text-foreground hover:bg-muted/10',
        ghost: 'hover:bg-muted/10 text-muted-foreground hover:text-foreground',
        black: 'bg-foreground text-background hover:opacity-90',
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
