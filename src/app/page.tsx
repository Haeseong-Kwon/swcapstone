"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Search, ChevronRight, Presentation, Rocket, Users, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchModal } from "@/components/common/SearchModal";

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const featureCards = [
    { title: "Course 01", label: "Business Strategy", icon: <Presentation size={28} />, href: "/community" },
    { title: "Course 02", label: "Tech Build", icon: <Rocket size={28} />, href: "/community" },
    { title: "팀빌딩", label: "Team Matching", icon: <Users size={28} />, href: "/community" },
    { title: "SW창업캡스톤디자인", label: "Dashboard", icon: <Briefcase size={28} />, href: "/dashboard" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 overflow-x-hidden">
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-black pt-20">
        <div className="absolute inset-0 z-0 overflow-hidden" style={{ isolation: 'isolate' }}>
          <Image
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
            alt="Hero Background"
            fill
            priority
            quality={75}
            className="object-cover opacity-40"
            sizes="100vw"
          />
          {/* Static gradient overlay — replaces animated blobs entirely. Zero GPU overhead. */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 80% 60% at 5% 40%, rgba(34,197,94,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 95% 70%, rgba(96,165,250,0.05) 0%, transparent 60%), linear-gradient(180deg, rgba(2,6,23,0.1) 0%, rgba(2,6,23,0.6) 60%, rgba(2,6,23,0.9) 100%)'
          }}></div>
        </div>

        <div className="relative z-10 mx-auto w-full fluid-container pb-16 pt-16 lg:pb-24 lg:pt-24">
          <div className="grid items-end gap-10 min-[1200px]:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-12 xl:gap-20">
            <div className="animate-slide-up space-y-8 sm:space-y-12 [animation-delay:0.1s]">
              <div className="inline-flex items-center gap-4 text-white/60">
                <span className="h-[1px] w-8 bg-white/40 sm:w-12"></span>
                <span className="text-[12px] font-bold tracking-[0.4em] uppercase">Gateway to SW Innovation</span>
              </div>

              <h1 className="fluid-title max-w-4xl text-white">
                Your Gateway to <br className="hidden md:block" />
                <span className="text-white italic opacity-90">Entrepreneurship.</span>
              </h1>

              <p className="max-w-2xl font-medium leading-relaxed text-white/80 fluid-body">
                한양대학교 ERICA SW창업캡스톤디자인 통합 플랫폼. 아이디어에서 기술 구현까지, 데이터 기반의 정교한 매칭으로 넥스트 유니콘으로의 여정을 함께합니다.
              </p>

              <div className="relative max-w-2xl animate-slide-up [animation-delay:0.3s] transform-gpu">
                <div className="group flex flex-col gap-3 rounded-[2rem] border border-white/12 bg-black/40 p-3 shadow-[0_32px_100px_rgba(0,0,0,0.3)] sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:p-2">
                  <div className="flex min-w-0 flex-1 items-center px-4 sm:px-8">
                    <Search className="mr-3 text-white/70 sm:mr-4" size={24} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && setIsSearchOpen(true)}
                      placeholder="Search for projects, teams..."
                      className="h-10 w-full bg-transparent text-[14px] font-medium text-white outline-none placeholder:text-white/40 sm:h-16 sm:text-[18px]"
                    />
                  </div>
                  <div className="hidden h-10 w-px bg-white/12 sm:block"></div>
                  <button 
                    onClick={() => setIsSearchOpen(true)}
                    className="flex h-10 items-center justify-center gap-2 rounded-full bg-white px-5 text-[12px] font-bold uppercase tracking-[0.22em] text-slate-950 premium-transition hover:bg-primary hover:text-white active:scale-95 sm:mx-2 sm:h-14 sm:px-10"
                  >
                    Search <ChevronRight size={18} />
                  </button>
                </div>
                <div className="mt-6 flex flex-wrap gap-2 px-2 sm:gap-4 sm:px-8">
                  {["#LMS", "#TeamBuilding", "#Capstone", "#Startup"].map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-[11px] font-bold text-white/60 premium-transition hover:border-white/30 hover:text-white sm:px-4 sm:py-1.5 sm:text-[12px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 text-white/70 sm:flex sm:flex-wrap sm:gap-8">
                {[
                  ["팀 빌딩", "데이터 기반 매칭"],
                  ["프로젝트 관리", "교육 흐름 통합"],
                  ["지원사업", "기회 탐색 최적화"],
                  ["포트폴리오", "성과 아카이빙"],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/8 px-6 py-6 hover:bg-white/14 transition-colors duration-300 sm:min-w-[200px] sm:flex-1">
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/50">{title}</p>
                    <p className="mt-3 text-[15px] font-semibold text-white/90">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 content-auto w-full animate-slide-up [animation-delay:0.5s]">
              {featureCards.map((card, i) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-xl hover-lift hover:border-white/30 hover:bg-white/14 sm:rounded-[3rem] sm:p-10 md:h-[260px] lg:h-[280px]"
                >
                  <div className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none z-0">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70"></div>
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white premium-transition group-hover:bg-white group-hover:text-slate-950 sm:h-16 sm:w-16">
                      {card.icon}
                    </div>
                    <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-white/10 premium-transition group-hover:opacity-100 sm:flex sm:h-12 sm:w-12">
                      <ChevronRight className="text-white" size={20} />
                    </div>
                  </div>
                  <div className="space-y-2 mt-4 sm:space-y-3 sm:mt-6">
                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40">{card.title}</p>
                    <h4 className="text-[20px] font-extrabold tracking-tight text-white sm:text-[26px] md:text-[28px]">
                      {card.label}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white section-padding dark:bg-slate-900 overflow-hidden content-auto contain-intrinsic-size-[auto_800px]">
        <div className="fluid-container transform-gpu">
          <div className="section-accent-bar mb-12 sm:mb-20 reveal-entry active">
            <h2 className="fluid-title mb-6 text-slate-900 dark:text-slate-50 uppercase">Core <br className="sm:hidden" /> Ecosystem</h2>
            <p className="max-w-2xl font-medium text-slate-600 dark:text-slate-400 fluid-subtitle">기획부터 기술 구현, 팀매칭까지 창업의 전 과정을 지원합니다.</p>
          </div>

          <div className="grid grid-cols-1 border-l border-t border-slate-200 dark:border-slate-700 md:grid-cols-2 min-[1200px]:grid-cols-3 content-auto">
            {[
              {
                title: "Business Model",
                desc: "비즈니스 모델 수립부터 IR 전략까지 창업의 기초를 다집니다.",
                category: "LMS 01"
              },
              {
                title: "Implementation",
                desc: "실제 서비스를 구현하고 기술적 완성도를 높이는 개발 중심 과목입니다.",
                category: "LMS 02"
              },
              {
                title: "Collaboration",
                desc: "데이터 기반의 적합한 팀원을 찾고 열정적인 프로젝트를 시작하세요.",
                category: "Network"
              }
            ].map((item, i) => (
              <div 
                key={item.title} 
                className="group relative overflow-visible border-b border-r border-slate-200 p-10 premium-transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/70 sm:p-14 lg:p-16 xl:p-20 reveal-entry active"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <span className="mb-6 block text-[12px] font-bold uppercase tracking-[0.3em] text-primary dark:text-blue-400">{item.category}</span>
                <h4 className="mb-6 text-[32px] font-black uppercase tracking-[-0.05em] text-slate-900 premium-transition group-hover:text-primary dark:text-slate-50 dark:group-hover:text-blue-400 lg:text-[42px]">{item.title}</h4>
                <p className="mb-12 font-medium leading-relaxed text-slate-600 dark:text-slate-400 fluid-body lg:min-h-[100px]">{item.desc}</p>
                <Button variant="ghost" className="p-0 text-slate-900 hover:bg-transparent dark:text-slate-50 gap-3 text-lg font-bold">
                  View Details <ChevronRight size={20} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        initialQuery={searchQuery}
      />
    </div>
  );
}
