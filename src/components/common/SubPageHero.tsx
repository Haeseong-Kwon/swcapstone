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
        <section className={cn("relative flex min-h-[72svh] items-center overflow-hidden bg-black pt-20 sm:min-h-[78svh]", className)}>
            <div className="absolute inset-0 z-0 gpu-accelerated">
                <Image
                    src={backgroundImage}
                    alt={title}
                    fill
                    priority
                    quality={76}
                    className="object-cover opacity-56 animate-slow-zoom transform-gpu"
                    sizes="(max-width: 1024px) 100vw, 100vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.28)_0%,rgba(2,6,23,0.58)_42%,rgba(2,6,23,0.92)_100%)]"></div>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-8xl px-5 py-12 animate-slide-up sm:px-6 sm:py-18 lg:px-8 lg:py-24">
                <div className="max-w-4xl">
                    <div className="mb-6 flex items-center gap-4 sm:mb-8">
                        <div className="h-[2px] w-10 bg-primary sm:w-12"></div>
                        <span className="text-[11px] font-black uppercase tracking-[0.32em] text-white/68 sm:text-[12px] sm:tracking-[0.4em]">Institutional Platform</span>
                    </div>
                    <h1 className="mb-6 text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-white drop-shadow-2xl sm:mb-8">
                        {title}
                    </h1>
                    {description && (
                        <p className="mb-8 max-w-2xl text-[16px] font-semibold leading-relaxed tracking-tight text-white/78 sm:mb-10 sm:text-[20px] lg:text-[22px]">
                            {description}
                        </p>
                    )}
                    {children}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20"></div>
        </section>
    );
}
