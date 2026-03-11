"use client";

import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";

export function Course1View() {
    return (
        <div className="space-y-24 animate-slide-up [animation-delay:0.2s]">
            <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-16">
                <div className="space-y-16">
                    <div className="p-12 bg-background border border-border shadow-sm group hover:border-primary premium-transition">
                        <div className="flex items-center gap-6 mb-8">
                            <Badge variant="primary" className="bg-primary/5 border-primary/20 text-primary">Strategic Focus</Badge>
                            <h2 className="text-[48px] md:text-[56px] font-black tracking-tightest uppercase leading-[0.9]">Eco Connect</h2>
                        </div>
                        <div className="section-accent-bar pl-8 border-l-4 border-primary/30">
                            <p className="text-[14px] font-black text-primary tracking-[0.3em] uppercase mb-4">Core Vision</p>
                            <p className="text-[22px] text-foreground font-bold leading-relaxed tracking-tight">
                                지역 기반 제로 웨이스트 상점들을 연결하여 친환경 소비 생태계를 구축합니다. 사용자는 앱을 통해 주변 입점 상점을 확인하고 친환경 제품을 구독할 수 있습니다.
                            </p>
                        </div>

                        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-border">
                            {[
                                { label: 'Phase', value: '01/IR' },
                                { label: 'Intensity', value: 'High' },
                                { label: 'Tech Level', value: 'Enterprise' },
                                { label: 'Progress', value: '85%' },
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">{stat.label}</p>
                                    <p className="text-[18px] font-black font-mono">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-10">
                        <div className="section-accent-bar">
                            <h3 className="text-[28px] font-black uppercase tracking-tighter">Project Milestones</h3>
                        </div>
                        <div className="overflow-hidden border border-border bg-background shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-muted/5 border-b border-border">
                                        <th className="p-6 text-[11px] font-black uppercase tracking-[0.2em] text-muted">Milestone Item</th>
                                        <th className="p-6 text-[11px] font-black uppercase tracking-[0.2em] text-muted">Status</th>
                                        <th className="p-6 text-[11px] font-black uppercase tracking-[0.2em] text-muted text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {[
                                        { name: 'Business Plan Draft', status: 'Submitted', date: '2024.03.01' },
                                        { name: 'IR Presentation (V1)', status: 'Approved', date: '2024.03.05' },
                                        { name: 'Financial Forecast', status: 'Pending', date: '2024.03.10' },
                                    ].map((item) => (
                                        <tr key={item.name} className="group hover:bg-muted/5 premium-transition">
                                            <td className="p-6">
                                                <p className="text-[17px] font-black uppercase tracking-tighter">{item.name}</p>
                                                <p className="text-[11px] font-bold text-muted uppercase tracking-widest mt-1">Due: {item.date}</p>
                                            </td>
                                            <td className="p-6">
                                                <Badge variant={item.status === 'Approved' ? 'success' : 'info'} className="bg-transparent border-current">
                                                    {item.status}
                                                </Badge>
                                            </td>
                                            <td className="p-6 text-right">
                                                <Button variant="outline" size="sm" className="h-10 px-6 border-border font-black text-[10px] hover:border-foreground">Revise</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <aside className="space-y-12">
                    <div className="p-10 bg-background border border-border shadow-sm relative overflow-hidden group">
                        <div className="section-accent-bar mb-10">
                            <h3 className="text-[24px] font-black uppercase tracking-tighter leading-none">Mentoring</h3>
                        </div>
                        <div className="space-y-10 relative z-10">
                            <div className="bg-muted/5 p-8 border-l-2 border-primary">
                                <p className="text-[11px] font-black text-primary tracking-[0.2em] uppercase mb-4 italic">Strategic Advice</p>
                                <p className="text-[17px] text-foreground font-bold leading-relaxed mb-6">
                                    &quot;수익 모델에 대한 구체적인 시뮬레이션이 추가되면 좋을 것 같습니다. 이전 소셜 벤처 성공 사례를 벤치마킹해보세요.&quot;
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center font-black rounded-sm group-hover:bg-primary premium-transition">K</div>
                                    <span className="text-[14px] font-black uppercase tracking-tighter">Prof. Kim</span>
                                </div>
                            </div>
                            <Button variant="black" className="w-full h-16 text-[13px] border-none shadow-xl">Contact Mentor</Button>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    </div>

                    <div className="p-10 border border-dashed border-border bg-transparent group hover:border-primary premium-transition cursor-pointer">
                        <p className="text-[10px] font-black text-muted uppercase tracking-[0.3em] mb-4 text-center">Software ID</p>
                        <p className="text-[14px] font-mono text-center text-primary group-hover:scale-105 premium-transition">AOP-EDU-2024-X82</p>
                    </div>
                </aside>
            </div>

            <section className="pt-24 border-t-2 border-foreground">
                <div className="section-accent-bar mb-16">
                    <h3 className="text-[40px] font-black uppercase tracking-tighter leading-none">Global Milestones</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b-2 border-foreground">
                                <th className="py-8 text-[12px] font-black uppercase tracking-[0.3em]">Institutional Assignment</th>
                                <th className="py-8 text-[12px] font-black uppercase tracking-[0.3em]">Hard Deadline</th>
                                <th className="py-8 text-[12px] font-black uppercase tracking-[0.3em]">Certification Status</th>
                                <th className="py-8 text-[12px] font-black uppercase tracking-[0.3em] text-right">Operational Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {[
                                { name: "Business Model Canvas (Initial)", date: "2024.03.15", status: "VERIFIED", state: "COMPLETED" },
                                { name: "Market Research & Competitor Analysis", date: "2024.03.22", status: "IN REVIEW", state: "PENDING" },
                                { name: "Final Institutional Business Plan", date: "2024.04.10", status: "NOT SUBMITTED", state: "WAITING" },
                            ].map((task, i) => (
                                <tr key={i} className="hover:bg-muted/5 premium-transition group">
                                    <td className="py-12 font-black text-[22px] tracking-tight uppercase group-hover:text-primary premium-transition">{task.name}</td>
                                    <td className="py-12 text-[16px] text-muted font-bold uppercase tracking-widest">{task.date}</td>
                                    <td className="py-12">
                                        <Badge variant={task.state === "COMPLETED" ? "success" : "primary"}>
                                            {task.status}
                                        </Badge>
                                    </td>
                                    <td className="py-12 text-right">
                                        <Button variant={task.state === "COMPLETED" ? "outline" : "black"} size="sm" className="h-12 px-8 uppercase tracking-widest">
                                            {task.state === "COMPLETED" ? "View Archive" : "Begin Upload"}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
