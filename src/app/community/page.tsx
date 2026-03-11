"use client";

import { useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
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
                <LazyMotion features={domAnimation}>
                    <div className="mb-14 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                        <div className="inline-flex items-center gap-1 overflow-hidden p-1 rounded-2xl bg-slate-100/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 w-fit">
                            {TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        "relative px-6 py-3 text-[11px] font-black tracking-[0.18em] uppercase premium-transition rounded-xl z-10",
                                        activeTab === tab
                                            ? "text-slate-900 dark:text-slate-50"
                                            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                                    )}
                                >
                                    {tab === 'ALL' ? 'Everything' : tab}
                                    {activeTab === tab && (
                                        <m.div
                                            layoutId="activeTabCommunity"
                                            className="absolute inset-0 -z-10 rounded-xl bg-white dark:bg-slate-700 shadow-sm border border-slate-200/50 dark:border-white/10"
                                            transition={{ type: "spring", stiffness: 350, damping: 35 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full lg:max-w-[460px] group">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-primary premium-transition">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by tech stack, role, or vision..."
                                className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-6 text-[15px] font-semibold tracking-tight text-slate-900 outline-none shadow-[0_2px_8px_rgba(0,0,0,0.04)] premium-transition placeholder:text-slate-400 focus:ring-2 focus:ring-primary/10 focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:focus:border-blue-400 sm:h-16 sm:text-[16px]"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 xl:gap-10 content-auto">
                        <AnimatePresence mode="popLayout">
                            {filteredPosts.map((post, i) => (
                                <m.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    key={post.id}
                                    className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-7 premium-transition hover:-translate-y-1 hover:shadow-2xl hover:border-primary dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-400 sm:p-9 lg:p-10 contain-layout-paint"
                                >
                                    <div className="relative z-10 flex flex-col h-full space-y-7 sm:space-y-8">
                                        <div className="flex items-center justify-between">
                                            <Badge variant={post.projectPhase === 'IDEA' ? 'primary' : 'success'} className="px-3 py-1 text-[10px] font-black rounded-lg">
                                                {post.projectPhase} Phase
                                            </Badge>
                                            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                                <Clock size={14} className="opacity-60" />
                                                {post.createdAt}
                                            </div>
                                        </div>

                                        <div className="flex-grow space-y-4">
                                            <h3 className="line-clamp-2 text-[24px] font-black uppercase leading-[1.1] tracking-[-0.03em] text-slate-900 group-hover:text-primary dark:text-slate-50 dark:group-hover:text-blue-400 premium-transition sm:text-[28px]">
                                                {post.title}
                                            </h3>
                                            <p className="line-clamp-3 text-[15px] font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-[16px]">
                                                {post.content}
                                            </p>
                                        </div>

                                        <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-4">Recruiting</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {post.recruitingRoles.map((role) => (
                                                        <span key={role.role} className="inline-flex items-center rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-700 premium-transition group-hover:bg-slate-900 group-hover:text-white dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-white dark:group-hover:text-slate-950">
                                                            {role.role}
                                                            <span className="ml-2 opacity-50">{role.current}/{role.total}</span>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 flex items-center justify-center font-black text-lg group-hover:scale-110 premium-transition shadow-lg">
                                                        {post.authorName[0]}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-900 dark:text-slate-50">{post.authorName}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Founder</p>
                                                    </div>
                                                </div>
                                                <button className="flex h-10 items-center justify-center rounded-xl bg-slate-50 px-5 text-[11px] font-black uppercase tracking-widest text-slate-900 hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-blue-400 premium-transition">
                                                    View Idea
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.01] premium-transition pointer-events-none" />
                                </m.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </LazyMotion>
            </div>
        </main>
    );
}
