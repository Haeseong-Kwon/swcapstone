import { ReactNode, memo, useCallback } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    noPadding?: boolean;
}

export const Card = memo(function Card({ children, className, onClick, noPadding = false }: CardProps) {
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick();
        }
    }, [onClick]);

    return (
        <div
            className={cn(
                "institutional-card premium-transition group relative hover-lift transform-gpu will-change-transform",
                "overflow-visible", // allow shadows to bleed
                !noPadding && "p-8 md:p-12",
                onClick && "cursor-pointer hover:bg-muted/5",
                className
            )}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {children}
        </div>
    );
});

Card.displayName = "Card";
