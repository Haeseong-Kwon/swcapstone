"use client";

import { SubPageHero } from "@/components/common/SubPageHero";
import { Badge } from "@/components/common/Badge";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import {
    User,
    Mail,
    Link as LinkIcon,
    Award,
    Rocket,
    Shield,
    Github,
    Settings,
    ChevronRight,
    MessageSquare,
    CheckCircle2
} from "lucide-react";

export default function ProfilePage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <SubPageHero
                title="My Identity"
                description="KIM CHULSU | Entrepreneurship Specialist. 분절된 아이디어를 실전 비즈니스로 구체화하는 SW 창업 전략가입니다."
                backgroundImage="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
            >
                <div className="flex flex-wrap gap-4 mt-8">
                    <Badge variant="primary" className="bg-primary/10 border-primary/20 text-primary">Senior Student</Badge>
                    <Badge variant="success" className="bg-green-500/10 border-green-500/20 text-green-500">Certified Innovator</Badge>
                    <Badge variant="info" className="bg-blue-500/10 border-blue-500/20 text-blue-500">SW Developer</Badge>
                </div>
            </SubPageHero>

            <div className="max-w-8xl mx-auto px-10 py-32 space-y-32">
                {/* Profile Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-20">
                    {/* Left: Info & Projects */}
                    <div className="space-y-24">
                        <div className="p-12 bg-background border border-border group hover:border-primary premium-transition">
                            <div className="flex flex-col md:flex-row gap-12 items-start">
                                <div className="w-40 h-40 bg-foreground text-background dark:bg-slate-100 dark:text-slate-900 flex items-center justify-center text-4xl font-black rounded-sm shrink-0">
                                    K
                                </div>
                                <div className="space-y-6 flex-grow">
                                    <h2 className="text-[40px] font-black uppercase tracking-tightest leading-none text-foreground">Kim Chulsu</h2>
                                    <p className="text-muted font-bold text-[18px] leading-relaxed">
                                        한양대학교 ERICA 소프트웨어학부 4학년. AI 기반 ESG 플랫폼 구축 프로젝트의 PM 및 백엔드 리드를 담당하고 있습니다.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
                                        <div className="flex items-center gap-3 text-muted">
                                            <Mail size={18} />
                                            <span className="font-bold text-[14px]">chulsu.kim@hanyang.ac.kr</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-muted">
                                            <Github size={18} />
                                            <span className="font-bold text-[14px]">github.com/chulsu-k</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-12 pt-12">
                            <div className="section-accent-bar flex items-center justify-between">
                                <h3 className="text-[32px] font-black uppercase tracking-tighter text-foreground">My Innovations</h3>
                                <Button variant="ghost" className="text-primary gap-2">Explore All <ChevronRight size={18} /></Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {[
                                    { title: "Eco Connect", role: "Project Lead", phase: "MVP Phase", status: "Active" },
                                    { title: "Smart Campus", role: "Contributor", phase: "Idea Phase", status: "Completed" }
                                ].map((project, i) => (
                                    <Card key={i} className="hover:border-primary bg-background" onClick={() => { }}>
                                        <div className="space-y-8">
                                            <div className="flex items-center justify-between">
                                                <Badge variant={project.status === 'Active' ? 'primary' : 'default'}>{project.status}</Badge>
                                                <Rocket size={20} className="text-muted" />
                                            </div>
                                            <div>
                                                <h4 className="text-[24px] font-black uppercase tracking-tighter mb-2 text-foreground">{project.title}</h4>
                                                <p className="text-[12px] font-black text-primary tracking-[0.2em] uppercase">{project.role}</p>
                                            </div>
                                            <p className="text-muted font-bold uppercase text-[11px] tracking-widest pt-4 border-t border-border focus:border-primary transition-colors">
                                                {project.phase}
                                            </p>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Achievements & Settings */}
                    <aside className="space-y-16">
                        <div className="p-12 bg-muted/5 border border-border group relative overflow-hidden">
                            <h3 className="text-[24px] font-black uppercase tracking-tighter mb-10 border-b border-border pb-6 flex items-center gap-3 text-foreground">
                                <Award size={24} className="text-primary" />
                                Achievements
                            </h3>
                            <div className="space-y-8">
                                {[
                                    { label: 'SW Competency', value: 'Level 5 (Expert)', icon: <Shield /> },
                                    { label: 'Startup Camp', value: '1st Place Winner', icon: <CheckCircle2 /> },
                                    { label: 'Industry Cert', value: 'AWS Practitioner', icon: <Rocket /> },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="mt-1 text-primary">{item.icon}</div>
                                        <div>
                                            <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-1">{item.label}</p>
                                            <p className="text-[16px] font-black uppercase tracking-tight text-foreground">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                        </div>

                        <div className="p-12 border-2 border-foreground bg-background space-y-10 group">
                            <h3 className="text-[24px] font-black uppercase tracking-tighter flex items-center gap-3 text-foreground">
                                <Settings size={24} className="group-hover:rotate-90 premium-transition" />
                                Preference
                            </h3>
                            <div className="space-y-6">
                                <button className="w-full flex items-center justify-between p-6 border border-border hover:border-foreground dark:hover:border-white premium-transition text-left group/item">
                                    <span className="font-black uppercase tracking-tighter text-foreground">Edit Account Info</span>
                                    <ChevronRight size={18} className="group-hover/item:translate-x-2 premium-transition text-border" />
                                </button>
                                <button className="w-full flex items-center justify-between p-6 border border-border hover:border-foreground dark:hover:border-white premium-transition text-left group/item">
                                    <span className="font-black uppercase tracking-tighter text-foreground">Privacy Settings</span>
                                    <ChevronRight size={18} className="group-hover/item:translate-x-2 premium-transition text-border" />
                                </button>
                                <Button variant="black" className="w-full h-16 uppercase tracking-widest text-[13px] shadow-xl mt-4 bg-foreground text-background hover:bg-muted transition-colors">Save Changes</Button>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Bottom Activity Section */}
                <section className="pt-24 border-t-2 border-foreground dark:border-slate-800">
                    <div className="section-accent-bar mb-16">
                        <h3 className="text-[40px] font-black uppercase tracking-tighter leading-none">Operational Log</h3>
                    </div>
                    <div className="space-y-8">
                        {[
                            { action: "Profile Updated", detail: "Personal contact information synchronized with Hanyang LDAP", date: "2024.03.10" },
                            { action: "Project Joined", detail: "Assigned as Project Lead for 'Eco Connect MVP'", date: "2024.03.05" },
                            { action: "Certification Verified", detail: "AWS Practitioner certificate uploaded and validated", date: "2024.02.28" },
                        ].map((log, i) => (
                            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-8 border border-border group hover:bg-muted/5 premium-transition">
                                <div className="space-y-2">
                                    <p className="text-[20px] font-black uppercase tracking-tightest group-hover:text-primary premium-transition">{log.action}</p>
                                    <p className="text-muted font-bold tracking-tight">{log.detail}</p>
                                </div>
                                <p className="text-[14px] font-black font-mono text-muted mt-4 md:mt-0 uppercase tracking-widest">{log.date}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
