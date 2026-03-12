"use client";

import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { MOCK_PROPOSALS } from "@/constants/mockData";
import { Building2, Calendar, Flame, ArrowRight } from "lucide-react";
import { SubPageHero } from "@/components/common/SubPageHero";

export default function ProposalsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <SubPageHero
                title="Opportunities"
                description="창업팀의 도약을 지원하는 정부/민간 연계 프로젝트를 탐색하고 제도적 지원을 요청하세요."
                backgroundImage="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop"
            />

            <div className="max-w-8xl mx-auto px-10 py-24 animate-slide-up [animation-delay:0.1s]">
                <div className="border-t border-border">
                    {MOCK_PROPOSALS.map((proposal, i) => (
                        <div
                            key={proposal.id}
                            className="group flex flex-col items-start py-12 border-b border-border hover:bg-muted/5 premium-transition px-6 sm:px-8 relative overflow-hidden animate-slide-up lg:flex-row lg:items-center lg:py-16"
                            style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                        >
                            <div className="flex flex-col sm:flex-row items-start gap-6 lg:flex-row lg:items-center lg:gap-0 lg:px-16 flex-grow relative z-10 space-y-6 sm:space-y-0 w-full">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-100 dark:bg-white/5 border border-border dark:border-white/10 flex items-center justify-center text-foreground dark:text-white group-hover:border-primary group-hover:text-primary premium-transition shrink-0 relative z-10 glass-card">
                                    <Building2 size={32} strokeWidth={1} className="sm:hidden" />
                                    <Building2 size={40} strokeWidth={1} className="hidden sm:block" />
                                </div>

                                <div className="flex-grow sm:pl-8 lg:px-0 space-y-4">
                                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                                        <div className="section-accent-bar">
                                            <span className="text-[11px] sm:text-[12px] font-black text-primary uppercase tracking-[0.3em]">{proposal.companyName}</span>
                                        </div>
                                        <Badge variant={proposal.category === 'GOVERNMENT' ? 'info' : 'primary'} className="bg-transparent border-primary/20 dark:border-white/20 text-foreground dark:text-white text-[9px] sm:text-[10px] px-3 sm:px-4 font-black">
                                            Institutional {proposal.category === 'GOVERNMENT' ? 'Gov' : 'Corp'}
                                        </Badge>
                                        {proposal.isHot && (
                                            <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 tracking-[0.2em] uppercase">
                                                <Flame size={16} className="fill-current animate-pulse" /> Hot Priority
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-[28px] sm:text-[36px] font-black tracking-tightest uppercase leading-[1.1] text-foreground group-hover:text-primary premium-transition">
                                        {proposal.title}
                                    </h3>
                                    <p className="text-[16px] sm:text-[18px] text-muted-foreground dark:text-slate-400 font-bold leading-relaxed max-w-4xl tracking-tight group-hover:text-foreground premium-transition">
                                        {proposal.description}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-6 sm:gap-10 shrink-0 pt-10 sm:pt-12 lg:pt-0 relative z-10 w-full lg:w-auto">
                                <div className="flex items-center gap-3 text-[11px] sm:text-[12px] font-black text-foreground/70 dark:text-white/70 uppercase tracking-[0.25em] bg-slate-100/50 dark:bg-white/5 px-5 py-3 sm:px-6 sm:py-4 border border-border dark:border-white/10 glass-card">
                                    <Calendar size={18} className="text-primary" />
                                    Due: {proposal.deadline}
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="lg" 
                                    className="h-14 sm:h-16 px-8 sm:px-12 gap-4 sm:gap-6 shadow-xl relative bg-background dark:bg-white text-foreground dark:text-black border-border dark:border-white hover:border-primary hover:bg-primary hover:text-white w-full sm:w-auto overflow-hidden premium-transition group/btn"
                                >
                                    <span className="relative z-10 text-[13px] uppercase font-black transition-colors duration-200">Apply Now</span>
                                    <ArrowRight size={22} className="relative z-10 group-hover/btn:translate-x-2 transition-transform duration-200" />
                                </Button>
                            </div>
                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.01] premium-transition pointer-events-none"></div>
                        </div>
                    ))}

                    <div className="py-32 flex flex-col items-center justify-center border-b border-border bg-muted/5 relative overflow-hidden">
                        <p className="text-[20px] text-muted-foreground font-black text-center uppercase tracking-tighter mb-10 leading-[1.2] max-w-2xl px-10 relative z-10">
                            More elite opportunities await in the archive. <br />
                            <span className="text-foreground italic">Institutional access grants you priority submission rights.</span>
                        </p>
                        <Button variant="outline" size="lg" className="h-16 bg-background border border-border px-14 text-[12px] font-black uppercase tracking-widest hover:border-primary relative z-10 text-foreground">
                            Enterprise Archive
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
