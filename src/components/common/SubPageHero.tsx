import Image from "next/image";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SubPageHeroProps {
    title: string;
    description?: string;
    backgroundImage?: string;
    children?: ReactNode;
    className?: string;
}

export function SubPageHero({
    title,
    description,
    backgroundImage = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    children,
    className
}: SubPageHeroProps) {
    return (
        <section className={cn("relative h-[80vh] min-h-[850px] flex items-center overflow-hidden bg-black", className)}>
            {/* Cinematic Background with Overlay */}
            <div className="absolute inset-0 z-0 gpu-accelerated">
                <Image
                    src={backgroundImage}
                    alt={title}
                    fill
                    priority
                    className="object-cover opacity-60 scale-100 animate-slow-zoom"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
            </div>

            {/* Content Container */}
            <div className="container max-w-8xl mx-auto px-10 relative z-10 animate-slide-up pt-[95px]">
                <div className="max-w-4xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-[2px] bg-primary"></div>
                        <span className="text-white/70 text-[12px] font-black uppercase tracking-[0.4em]">Institutional Platform</span>
                    </div>
                    <h1 className="text-white text-[64px] md:text-[80px] font-black tracking-tightest uppercase leading-[0.9] mb-10 drop-shadow-2xl">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-white/80 text-[20px] md:text-[24px] font-bold leading-relaxed max-w-2xl tracking-tight mb-12">
                            {description}
                        </p>
                    )}
                    {children}
                </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20"></div>
        </section>
    );
}
