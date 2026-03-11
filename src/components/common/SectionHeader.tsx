import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title: string;
    description?: string;
    className?: string;
    children?: React.ReactNode;
}

export function SectionHeader({ title, description, className, children }: SectionHeaderProps) {
    return (
        <div className={cn("glass-header p-10 mb-20 border border-border/50 dark:border-white/5", className)}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                <div className="section-accent-bar space-y-6">
                    <h1 className="text-[48px] font-black text-slate-900 dark:text-slate-50 leading-none tracking-tighter uppercase">{title}</h1>
                    {description && <p className="text-[22px] text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed font-medium">{description}</p>}
                </div>
                {children && <div className="flex items-center gap-6 pb-2">{children}</div>}
            </div>
        </div>
    );
}
