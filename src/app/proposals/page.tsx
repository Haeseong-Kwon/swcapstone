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
                            className="group flex flex-col lg:flex-row items-start lg:items-center py-16 border-b border-border hover:bg-muted/5 premium-transition px-8 relative overflow-hidden animate-slide-up"
                            style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                        >
                            <div className="w-24 h-24 bg-slate-100 dark:bg-white/5 border border-border dark:border-white/10 flex items-center justify-center text-foreground dark:text-white group-hover:border-primary group-hover:text-primary premium-transition shrink-0 mb-8 lg:mb-0 relative z-10 glass-card">
                                <Building2 size={40} strokeWidth={1} />
                            </div>

                            <div className="flex-grow lg:px-16 space-y-6 relative z-10">
                                <div className="flex items-center gap-6">
                                    <div className="section-accent-bar">
                                        <span className="text-[12px] font-black text-primary uppercase tracking-[0.3em]">{proposal.companyName}</span>
                                    </div>
                                    <Badge variant={proposal.category === 'GOVERNMENT' ? 'info' : 'primary'} className="bg-transparent border-primary/20 dark:border-white/20 text-foreground dark:text-white text-[10px] px-4 font-black">
                                        Institutional {proposal.category === 'GOVERNMENT' ? 'Gov' : 'Corp'}
                                    </Badge>
                                    {proposal.isHot && (
                                        <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 tracking-[0.2em] uppercase">
                                            <Flame size={16} className="fill-current animate-pulse" /> Hot Priority
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-[36px] font-black tracking-tightest uppercase leading-[1.1] text-foreground group-hover:text-primary premium-transition">
                                    {proposal.title}
                                </h3>
                                <p className="text-[18px] text-muted-foreground dark:text-slate-400 font-bold leading-relaxed max-w-4xl tracking-tight group-hover:text-foreground premium-transition">
                                    {proposal.description}
                                </p>
                            </div>

                             <div className="flex flex-col lg:items-end gap-10 shrink-0 pt-12 lg:pt-0 relative z-10">
                                <div className="flex items-center gap-3 text-[12px] font-black text-foreground/70 dark:text-white/70 uppercase tracking-[0.25em] bg-slate-100/50 dark:bg-white/5 px-6 py-4 border border-border dark:border-white/10 glass-card">
                                    <Calendar size={18} className="text-primary" />
                                    Due: {proposal.deadline}
                                </div>
                                <Button variant="outline" size="lg" className="h-16 px-12 gap-6 group/btn shadow-xl overflow-hidden relative bg-background dark:bg-white text-foreground dark:text-black border-border dark:border-white hover:border-primary">
                                    <span className="relative z-10 text-[13px] group-hover:text-white uppercase font-black">Apply Now</span>
                                    <ArrowRight size={22} className="relative z-10 group-hover:text-white group-hover/btn:translate-x-2 premium-transition" />
                                    <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 premium-transition"></div>
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
