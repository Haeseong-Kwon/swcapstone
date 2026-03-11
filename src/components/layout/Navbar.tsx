"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search, Bell, User as UserIcon, Menu, X, ChevronRight, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const NAV_ITEMS = [
    { name: "SW창업캡스톤디자인", href: "/dashboard", desc: "Project & Grade Management" },
    { name: "팀빌딩", href: "/community", desc: "Team matching & Networking" },
    { name: "지원사업", href: "/proposals", desc: "Corp/Gov Projects" },
    { name: "인사이트", href: "/insights", desc: "Startup Knowhow & Media" },
    { name: "포트폴리오", href: "/portfolio", desc: "Startup Results & Pitch" },
];

export function Navbar() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav className={cn(
                "fixed top-0 left-0 right-0 z-50 border-b premium-transition will-change-transform",
                isScrolled
                    ? "glass-header shadow-[0_10px_30px_rgba(15,23,42,0.10)] border-white/5"
                    : "bg-gradient-to-b from-black/72 via-black/24 to-transparent border-transparent"
            )}>
                <div className="max-w-8xl mx-auto flex h-[78px] items-center justify-between px-5 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-6 lg:gap-12">
                        <Link href="/" className="flex items-center gap-3 group">
                            <span className={cn(
                                "text-2xl sm:text-3xl font-black tracking-tighter premium-transition",
                                isScrolled ? "text-foreground" : "text-white"
                            )}>AOP</span>
                            <div className={cn(
                                "w-[1px] h-6 mx-2 premium-transition",
                                isScrolled ? "bg-border" : "bg-white/20"
                            )}></div>
                            <span className={cn(
                                "text-[11px] font-bold tracking-[0.3em] uppercase premium-transition",
                                isScrolled ? "text-muted-foreground" : "text-white/70"
                            )}>Entrepreneurship</span>
                        </Link>

                        <div className="hidden lg:flex items-center gap-7 xl:gap-10">
                            {NAV_ITEMS.map((item) => {
                                const isActive = !!(pathname && item.href && pathname.startsWith(item.href));
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            "relative flex h-[78px] items-center text-[13px] xl:text-[14px] font-black uppercase tracking-[0.18em] premium-transition",
                                            isScrolled
                                                ? (isActive ? "text-primary dark:text-blue-400 border-b-4 border-primary dark:border-blue-400" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50")
                                                : (isActive ? "text-white border-b-4 border-white" : "text-white/70 hover:text-white")
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
                        <button
                            onClick={toggleTheme}
                            className={cn(
                                "p-2 rounded-full premium-transition",
                                isScrolled ? "text-muted-foreground hover:bg-muted/10 hover:text-foreground" : "text-white/80 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <div className={cn(
                            "hidden md:flex items-center gap-3 border-r pr-5 mr-2 premium-transition lg:pr-7 lg:mr-3",
                            isScrolled ? "border-border" : "border-white/20"
                        )}>
                            <button className={cn(
                                "premium-transition hover:scale-110",
                                isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"
                            )}>
                                <Search size={22} />
                            </button>
                            <button className={cn(
                                "premium-transition hover:scale-110 relative",
                                isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"
                            )}>
                                <Bell size={22} />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
                            </button>
                        </div>

                        <Link href="/profile" className="flex items-center gap-4 group">
                            <div className="text-right hidden sm:block">
                                <p className={cn(
                                    "text-[10px] font-bold leading-none mb-1 uppercase tracking-widest",
                                    isScrolled ? "text-muted-foreground" : "text-white/70"
                                )}>Status: Active</p>
                                <p className={cn(
                                    "text-[14px] font-black leading-none",
                                    isScrolled ? "text-foreground group-hover:text-primary" : "text-white group-hover:text-primary"
                                )}>KIM CHULSU</p>
                            </div>
                            <div className={cn(
                                "flex h-10 w-10 items-center justify-center premium-transition group-hover:scale-105 sm:h-11 sm:w-11",
                                isScrolled ? "bg-foreground text-background" : "bg-white text-black"
                            )}>
                                <UserIcon size={20} />
                            </div>
                        </Link>

                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className={cn(
                                "lg:hidden premium-transition hover:scale-110",
                                isScrolled ? "text-foreground" : "text-white"
                            )}
                        >
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Premium Full-Screen Overlay Menu */}
            <div className={cn(
                "fixed inset-0 z-[100] flex flex-col overflow-hidden bg-black/96 premium-transition will-change-transform",
                isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
            )}>
                <div className="flex h-[78px] items-center justify-between border-b border-white/10 px-5 sm:px-6">
                    <span className="text-3xl font-black text-white tracking-tighter">AOP</span>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-white hover:rotate-90 premium-transition p-2"
                    >
                        <X size={40} />
                    </button>
                </div>

                <div className="flex flex-grow flex-col justify-center space-y-8 px-5 py-8 sm:px-6 sm:space-y-10">
                    {NAV_ITEMS.map((item, i) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group block"
                        >
                            <span className="text-white/30 text-[14px] font-black uppercase tracking-[0.3em] mb-4 block">0{i + 1}.</span>
                            <div className="flex items-center justify-between border-b border-white/10 pb-5">
                                <div>
                                    <h2 className="text-white text-[32px] sm:text-[42px] lg:text-[48px] font-black uppercase tracking-tight group-hover:text-primary premium-transition">
                                        {item.name}
                                    </h2>
                                    <p className="mt-2 text-[11px] sm:text-[12px] text-white/40 font-bold uppercase tracking-[0.18em]">{item.desc}</p>
                                </div>
                                <ChevronRight size={36} className="text-white/10 group-hover:text-primary group-hover:translate-x-2 premium-transition sm:size-12" />
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="border-t border-white/10 bg-white/5 p-5 sm:p-6">
                    <div className="flex flex-col gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
                        <span>Hanyang Univ ERICA</span>
                        <span>© 2024 Innovate Ahead</span>
                    </div>
                </div>
            </div>
        </>
    );
}
