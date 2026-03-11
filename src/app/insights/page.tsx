"use client";

import Image from "next/image";
import { Badge } from "@/components/common/Badge";
import { SubPageHero } from "@/components/common/SubPageHero";
import { MOCK_INSIGHTS } from "@/constants/mockData";
import { Calendar, Clock, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Reusable Article Card Component
const ArticleCard = ({ article, index }: { article: any, index: number }) => (
    <Link
        href="#"
        className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-blue-400 premium-transition relative overflow-hidden animate-slide-up h-full"
        style={{ animationDelay: `${0.2 + index * 0.1}s` }}
    >
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
            <Image
                src={article.thumbnailUrl}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 premium-transition"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            />
            <div className="absolute top-4 left-4 z-10">
                <Badge variant="primary" className="bg-primary text-white border-none shadow-lg px-3 py-1 text-[10px] tracking-wider">
                    {article.category}
                </Badge>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 premium-transition"></div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col flex-grow">
            <h3 className="text-xl font-black text-slate-900 dark:text-slate-50 mb-4 group-hover:text-primary dark:group-hover:text-blue-400 premium-transition line-clamp-2 leading-tight">
                {article.title}
            </h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-8 flex-grow">
                {article.excerpt}
            </p>

            {/* Footer Info */}
            <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                    <span>{article.author}</span>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                        <Clock size={12} /> {article.readTime}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white dark:group-hover:text-white premium-transition">
                        <ChevronRight size={16} />
                    </div>
                </div>
            </div>
        </div>
    </Link>
);

export default function InsightsPage() {
    const categories = ["전체", "지원사업 공고", "지원사업 교육", "창업 지원금", "창업투자", "판로개척", "창업노하우"];

    return (
        <main className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50">
            <SubPageHero
                title="Insights"
                description="창업에 필요한 모든 정보를 투명하게 공유하여, 기회가 필요한 창업자에게 올바른 기회가 주어지도록 기여합니다."
                backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
            />

            <div className="max-w-8xl mx-auto px-10 py-16 animate-slide-up [animation-delay:0.1s]">
                
                {/* Search & Popular Tags Section */}
                <div className="mb-20 bg-slate-50 dark:bg-slate-800/30 p-10 border border-slate-200 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center space-y-8">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight">어떤 인사이트를 찾고 계신가요?</h2>
                    
                    <div className="relative w-full max-w-3xl group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary premium-transition" size={24} />
                        <input
                            type="text"
                            placeholder="스타트업, 지원사업, 창업꿀팁 검색..."
                            className="w-full pl-16 pr-8 h-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-primary dark:focus:border-blue-400 outline-none font-bold text-[17px] tracking-tight text-slate-900 dark:text-slate-50 placeholder:text-slate-400 rounded-2xl shadow-sm premium-transition"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary hover:text-white premium-transition">
                            검색
                        </button>
                    </div>

                    <div className="flex flex-col items-center gap-4 w-full">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">인기 검색어</span>
                        <div className="flex flex-wrap justify-center gap-3">
                            {["스타트업", "지원사업 공고", "지원사업 교육", "창업 지원금", "창업투자", "판로개척", "창업노하우"].map(tag => (
                                <button key={tag} className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-full hover:border-primary dark:hover:border-blue-400 hover:text-primary dark:hover:text-blue-400 premium-transition">
                                    # {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Sections */}
                <div className="space-y-24">
                    {/* Section 1: Insights (Main Articles) */}
                    <section>
                        <div className="flex items-end justify-between mb-10">
                            <div>
                                <h2 className="text-4xl font-black text-slate-900 dark:text-slate-50 tracking-tighter mb-2">인사이트</h2>
                                <p className="text-slate-600 dark:text-slate-400 font-medium text-lg">성공적인 창업을 위한 전문가들의 깊이 있는 분석</p>
                            </div>
                            <button className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400 premium-transition flex items-center gap-1">
                                전체보기 <ChevronRight size={16} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                            {MOCK_INSIGHTS.map((article, i) => (
                                <ArticleCard key={`insight-${article.id}`} article={article} index={i} />
                            ))}
                        </div>
                    </section>

                    {/* Section 2: Knowhow Tips */}
                    <section>
                        <div className="flex items-end justify-between mb-10">
                            <div>
                                <h2 className="text-4xl font-black text-slate-900 dark:text-slate-50 tracking-tighter mb-2">창업 관련 정보</h2>
                                <p className="text-slate-600 dark:text-slate-400 font-medium text-lg">실전에서 바로 써먹는 창업 가이드</p>
                            </div>
                            <button className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400 premium-transition flex items-center gap-1">
                                더 많은 꿀팁 <ChevronRight size={16} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Reverse or slice mock data to make it look different */}
                            {[...MOCK_INSIGHTS].reverse().slice(0, 3).map((article, i) => (
                                <ArticleCard key={`tip-${article.id}`} article={{ ...article, category: '창업꿀팁' }} index={i} />
                            ))}
                        </div>
                    </section>

                    {/* Section 3: Media */}
                    <section className="bg-slate-50 dark:bg-slate-800/30 -mx-10 px-10 py-20 border-y border-slate-200 dark:border-slate-700">
                        <div className="max-w-8xl mx-auto">
                            <div className="flex items-end justify-between mb-10">
                                <div>
                                    <h2 className="text-4xl font-black text-slate-900 dark:text-slate-50 tracking-tighter mb-2">미디어</h2>
                                    <p className="text-slate-600 dark:text-slate-400 font-medium text-lg">최신 스타트업 트렌드와 뉴스</p>
                                </div>
                                <button className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400 premium-transition flex items-center gap-1">
                                    뉴스 더보기 <ChevronRight size={16} />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[...MOCK_INSIGHTS].slice(0, 2).map((article, i) => (
                                    <Link
                                        href="#"
                                        key={`media-${article.id}`}
                                        className="group flex flex-col md:flex-row bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-blue-400 premium-transition relative overflow-hidden min-h-[240px]"
                                    >
                                        <div className="relative w-full h-56 md:h-auto md:w-2/5 overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                                            <Image
                                                src={article.thumbnailUrl}
                                                alt={article.title}
                                                fill
                                                className="object-cover group-hover:scale-105 premium-transition"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent opacity-0 group-hover:opacity-100 premium-transition"></div>
                                        </div>
                                        <div className="p-8 flex flex-col flex-grow justify-center">
                                            <Badge variant="success" className="w-fit mb-4">미디어</Badge>
                                            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-50 mb-4 group-hover:text-primary dark:group-hover:text-blue-400 premium-transition line-clamp-2">
                                                {article.title}
                                            </h3>
                                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 line-clamp-2 mb-6">
                                                {article.excerpt}
                                            </p>
                                            <div className="flex items-center text-xs font-bold text-slate-500 dark:text-slate-400 mt-auto">
                                                <Calendar size={14} className="mr-2" /> {article.date}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
