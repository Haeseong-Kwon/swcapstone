import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    noPadding?: boolean;
}

export function Card({ children, className, onClick, noPadding = false }: CardProps) {
    return (
        <div
            className={cn(
                "sharp-card premium-transition group relative",
                !noPadding && "p-8 md:p-12",
                onClick && "cursor-pointer hover:bg-muted/5",
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
