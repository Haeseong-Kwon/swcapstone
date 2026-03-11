"use client";

import { useState } from "react";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { MOCK_TEAM_POSTS } from "@/constants/mockData";
import { Search, Plus, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubPageHero } from "@/components/common/SubPageHero";

export default function CommunityPage() {
    const [activeTab, setActiveTab] = useState<'ALL' | 'IDEA' | 'MVP'>('ALL');

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

            <div className="max-w-8xl mx-auto px-10 py-24 animate-slide-up [animation-delay:0.1s]">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between glass-header p-10 mb-20 gap-12 border border-slate-200 dark:border-slate-700">
                    <div className="flex bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-1.5 overflow-hidden rounded-md">
                        {['ALL', 'IDEA', 'MVP'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={cn(
                                    "px-10 py-3 text-[11px] font-black tracking-[0.2em] uppercase premium-transition",
                                    activeTab === tab
                                        ? "bg-white dark:bg-slate-700 text-primary dark:text-blue-400 shadow-lg"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                                )}
                            >
                                {tab === 'ALL' ? 'Everything' : tab}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full lg:w-[500px] group">
                        <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 group-focus-within:text-slate-900 dark:group-focus-within:text-slate-50 premium-transition" size={24} />
                        <input
                            type="text"
                            placeholder="Search by tech stack, role, or vision..."
                            className="w-full pl-20 pr-10 h-18 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-primary dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-800 outline-none font-bold text-[17px] tracking-tight text-slate-900 dark:text-slate-50 placeholder:text-slate-500 premium-transition shadow-lg rounded-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {filteredPosts.map((post, i) => (
                        <div
                            key={post.id}
                            className="p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 group hover:border-primary dark:hover:border-blue-400 premium-transition relative overflow-hidden animate-slide-up"
                            style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                        >
                            <div className="relative z-10 space-y-10">
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
                                    <h3 className="text-[28px] font-black tracking-tightest uppercase group-hover:text-primary dark:group-hover:text-blue-400 premium-transition line-clamp-2 leading-[1.1] text-slate-900 dark:text-slate-50">
                                        {post.title}
                                    </h3>
                                    <p className="text-[17px] text-slate-700 dark:text-slate-300 font-bold line-clamp-3 min-h-[75px] leading-relaxed tracking-tight group-hover:text-slate-900 dark:group-hover:text-slate-50 premium-transition">
                                        {post.content}
                                    </p>
                                </div>

                                <div className="space-y-10 pt-10 border-t border-slate-200 dark:border-slate-700">
                                    <div className="section-accent-bar">
                                        <p className="text-[10px] font-black text-primary dark:text-blue-400 tracking-[0.3em] uppercase mb-4">Required Stack</p>
                                        <div className="flex flex-wrap gap-2">
                                            {post.recruitingRoles.map((role) => (
                                                <span key={role.role} className="px-4 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[9px] font-black uppercase tracking-widest group-hover:bg-slate-900 dark:group-hover:bg-slate-50 group-hover:text-white dark:group-hover:text-slate-900 premium-transition text-slate-700 dark:text-slate-300">
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
