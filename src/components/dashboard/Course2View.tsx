"use client";

import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { Github, PlayCircle, Code, ExternalLink, Link as LinkIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Course2ViewProps {
    onOpenImport: () => void;
    hasImportedData?: boolean;
}

export function Course2View({ onOpenImport, hasImportedData }: Course2ViewProps) {
    return (
        <div className="space-y-24 animate-slide-up [animation-delay:0.2s]">
            {/* Import Notification Banner - Refined */}
            {!hasImportedData && (
                <div className="p-12 bg-background border border-dashed border-primary/30 flex flex-col md:flex-row items-center justify-between gap-10 group hover:border-primary premium-transition">
                    <div className="flex items-center gap-8">
                        <div className="w-20 h-20 bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 premium-transition">
                            <LinkIcon size={36} />
                        </div>
                        <div>
                            <p className="text-[22px] font-black tracking-tighter uppercase leading-tight group-hover:text-primary premium-transition">Synchronize Course 01 Data</p>
                            <p className="text-muted font-bold text-[15px] max-w-xl">과목 1에서 승인된 사업계획서와 IR 데이터를 현재 구현 프로젝트와 매끄럽게 연결합니다.</p>
                        </div>
                    </div>
                    <Button variant="black" size="lg" onClick={onOpenImport} className="whitespace-nowrap h-16 px-12 text-[13px] border-none shadow-xl">
                        Execute Import
                    </Button>
                </div>
            )}

            {hasImportedData && (
                <div className="p-6 bg-foreground text-background flex items-center justify-between rounded-sm">
                    <div className="flex items-center gap-6">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <span className="text-[13px] font-black uppercase tracking-[0.3em]">'Eco Connect' Data Linked</span>
                    </div>
                    <Badge variant="success" className="bg-primary text-white border-none px-6 text-[9px]">Active Sync</Badge>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-16">
                <div className="space-y-16">
                    <div className="p-12 bg-background border border-border shadow-sm group hover:border-primary premium-transition">
                        <div className="flex items-center gap-6 mb-12">
                            <Badge variant="primary" className="bg-primary/5 border-primary/20 text-primary">Implementation Phase</Badge>
                            <h3 className="text-[48px] md:text-[56px] font-black tracking-tightest uppercase leading-[0.9]">Eco Connect MVP</h3>
                        </div>

                        <div className="space-y-16">
                            <div className="section-accent-bar">
                                <h4 className="text-[11px] font-black text-primary tracking-[0.3em] uppercase mb-8">Technical Infrastructure</h4>
                                <div className="p-10 bg-muted/5 border border-border group/repo cursor-pointer hover:bg-background premium-transition">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <Github size={28} className="text-foreground group-hover/repo:scale-110 premium-transition" />
                                            <span className="text-[18px] font-black uppercase tracking-tighter">Main Repository</span>
                                        </div>
                                        <Badge className="border-border px-6 text-foreground bg-background">Certified</Badge>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-primary/30 pb-6">
                                        <code className="text-[16px] font-mono font-bold text-foreground group-hover/repo:text-primary premium-transition">https://github.com/hanyang-capstone/eco-connect-mvp</code>
                                        <ExternalLink size={20} className="text-muted group-hover/repo:text-primary premium-transition" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                                <div className="space-y-10">
                                    <div className="section-accent-bar">
                                        <h4 className="text-[11px] font-black text-muted tracking-[0.2em] uppercase">Visual Demo</h4>
                                    </div>
                                    <div className="aspect-video bg-muted/5 border border-border flex flex-col items-center justify-center text-muted gap-4 group cursor-pointer hover:border-foreground premium-transition">
                                        <PlayCircle size={40} strokeWidth={1} className="group-hover:scale-110 group-hover:text-foreground premium-transition" />
                                        <span className="font-black text-[11px] uppercase tracking-widest">Awaiting Upload</span>
                                    </div>
                                </div>
                                <div className="space-y-10">
                                    <div className="section-accent-bar">
                                        <h4 className="text-[11px] font-black text-muted tracking-[0.2em] uppercase">Enterprise Stack</h4>
                                    </div>
                                    <div className="flex flex-wrap gap-3 p-8 bg-muted/5 border border-border">
                                        {['Next.js 14+', 'Tailwind CSS', 'Supabase', 'TypeScript'].map((tech) => (
                                            <Badge key={tech} className="bg-background border-border text-foreground text-[10px] px-4 py-2 font-mono">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <aside className="space-y-12">
                    <div className="p-10 bg-background border border-border shadow-sm group">
                        <div className="section-accent-bar mb-12">
                            <h3 className="text-[24px] font-black uppercase tracking-tighter leading-none text-foreground">Tech Board</h3>
                        </div>
                        <div className="space-y-12">
                            <div className="relative p-8 bg-surface border-l-2 border-primary">
                                <Code className="absolute -top-4 -right-4 w-10 h-10 bg-primary/10 text-primary p-2.5 rounded-full" />
                                <p className="text-[10px] font-black text-primary tracking-[0.3em] uppercase mb-4 italic">Architecture Pattern</p>
                                <p className="text-[17px] text-foreground font-bold leading-relaxed mb-6">
                                    "현재 프로젝트 규모에서는 복잡한 상태 관리 라이브러리 없이 React Context만으로 충분해 보입니다. 오버엔지니어링을 경계하세요."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center font-black rounded-sm group-hover:bg-primary premium-transition">M</div>
                                    <span className="text-[14px] font-black uppercase tracking-tighter">Architect Lee</span>
                                </div>
                            </div>
                            <Button variant="black" className="w-full h-16 text-[13px] border-none shadow-xl">Request Technical Review</Button>
                        </div>
                    </div>

                    <div className="p-10 border border-dashed border-border bg-transparent group hover:border-primary premium-transition cursor-pointer">
                        <p className="text-[10px] font-black text-muted uppercase tracking-[0.3em] mb-4 text-center">Tech Hash</p>
                        <p className="text-[14px] font-mono text-center text-primary group-hover:scale-105 premium-transition truncate px-4">#82AB-2024-CAPSTONE</p>
                    </div>
                </aside>
            </div>
        </div>
    );
}
