"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { MOCK_TEAM_POSTS } from "@/constants/mockData";
import { Search, Plus, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubPageHero } from "@/components/common/SubPageHero";

const TABS = ['ALL', 'IDEA', 'MVP'] as const;
type ActiveTab = typeof TABS[number];

export default function CommunityPage() {
    const [activeTab, setActiveTab] = useState<ActiveTab>('ALL');

    const filteredPosts = activeTab === 'ALL'
        ? MOCK_TEAM_POSTS
        : MOCK_TEAM_POSTS.filter(post => post.projectPhase === activeTab);

    return (
        <main className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50">
            <SubPageHero
                title="Networking"
                description="최고의 기술력과 아이디어를 가진 팀원들을 찾아 열정적인 프로젝트를 시작하세요."
                backgroundImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
            >
                <Button variant="outline" size="lg" className="bg-white text-black border-white hover:bg-primary hover:text-white hover:border-primary gap-4 h-18 px-14 group/post shadow-2xl">
                    <Plus size={24} className="group-hover:rotate-90 premium-transition" />
                    <span className="text-[14px]">Create New Proposal</span>
                </Button>
            </SubPageHero>

            <div className="mx-auto max-w-8xl px-5 py-16 animate-slide-up sm:px-6 sm:py-20 lg:px-8 lg:py-24 [animation-delay:0.1s]">
                <div className="mb-14 flex flex-col gap-6 border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/70 sm:p-6 lg:mb-20 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                    <div className="flex flex-wrap overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-1.5 dark:border-slate-700 dark:bg-slate-800/50">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "px-5 py-3 text-[11px] font-black tracking-[0.2em] uppercase premium-transition sm:px-8",
                                    activeTab === tab
                                        ? "bg-white dark:bg-slate-700 text-primary dark:text-blue-400 shadow-lg"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                                )}
                            >
                                {tab === 'ALL' ? 'Everything' : tab}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full lg:max-w-[460px] group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 group-focus-within:text-slate-900 dark:group-focus-within:text-slate-50 premium-transition" size={20} />
                        <input
                            type="text"
                            placeholder="Search by tech stack, role, or vision..."
                            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-5 text-[15px] font-semibold tracking-tight text-slate-900 outline-none shadow-sm premium-transition placeholder:text-slate-500 focus:border-primary focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-50 dark:focus:border-blue-400 dark:focus:bg-slate-800 sm:h-16 sm:text-[16px]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3 content-auto">
                    {filteredPosts.map((post, i) => (
                        <div
                            key={post.id}
                            className="group relative overflow-hidden border border-slate-200 bg-white p-7 premium-transition hover:-translate-y-1 hover:border-primary dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-400 sm:p-8 lg:p-10 animate-slide-up contain-layout-paint"
                            style={{ animationDelay: `${0.18 + i * 0.05}s` }}
                        >
                            <div className="relative z-10 space-y-7 sm:space-y-8">
                                <div className="flex items-center justify-between">
                                    <Badge variant={post.projectPhase === 'IDEA' ? 'primary' : 'success'} className="bg-transparent border-current text-[10px] px-4 py-1">
                                        {post.projectPhase} Phase
                                    </Badge>
                                    <div className="flex items-center gap-3 text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-[0.2em]">
                                        <Clock size={14} />
                                        {post.createdAt}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="line-clamp-2 text-[24px] font-black uppercase leading-[1.08] tracking-[-0.04em] text-slate-900 premium-transition group-hover:text-primary dark:text-slate-50 dark:group-hover:text-blue-400 sm:text-[26px]">
                                        {post.title}
                                    </h3>
                                    <p className="min-h-[72px] line-clamp-3 text-[15px] font-medium leading-relaxed tracking-tight text-slate-700 premium-transition group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-slate-50 sm:text-[16px]">
                                        {post.content}
                                    </p>
                                </div>

                                <div className="space-y-7 border-t border-slate-200 pt-7 dark:border-slate-700 sm:space-y-8 sm:pt-8">
                                    <div className="section-accent-bar">
                                        <p className="text-[10px] font-black text-primary dark:text-blue-400 tracking-[0.3em] uppercase mb-4">Required Stack</p>
                                        <div className="flex flex-wrap gap-2">
                                            {post.recruitingRoles.map((role) => (
                                                <span key={role.role} className="border border-slate-200 bg-slate-50 px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-slate-700 premium-transition group-hover:bg-slate-900 group-hover:text-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-slate-50 dark:group-hover:text-slate-900">
                                                    {role.role} ({role.current}/{role.total})
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 flex items-center justify-center font-black text-lg group-hover:bg-primary dark:group-hover:bg-blue-400 premium-transition">
                                                {post.authorName[0]}
                                            </div>
                                            <div>
                                                <p className="text-[15px] font-black uppercase tracking-tighter leading-none text-slate-900 dark:text-slate-50">{post.authorName}</p>
                                                <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-[0.2em] mt-1">Founder</p>
                                            </div>
                                        </div>
                                        <button className="text-[11px] font-black border-b-2 border-slate-900 dark:border-slate-50 uppercase tracking-widest text-slate-900 dark:text-slate-50 hover:text-primary dark:hover:text-blue-400 hover:border-primary dark:hover:border-blue-400 premium-transition pb-0.5">
                                            View Plan
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.02] premium-transition pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
