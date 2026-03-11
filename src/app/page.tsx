import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Search, ChevronRight, Presentation, Rocket, Users, Briefcase } from "lucide-react";

export default function Home() {
  const featureCards = [
    { title: "Course 01", label: "Business Strategy", icon: <Presentation size={28} />, href: "/community" },
    { title: "Course 02", label: "Tech Build", icon: <Rocket size={28} />, href: "/community" },
    { title: "팀빌딩", label: "Team Matching", icon: <Users size={28} />, href: "/community" },
    { title: "SW창업캡스톤디자인", label: "Dashboard", icon: <Briefcase size={28} />, href: "/dashboard" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50">
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-black pt-20">
        <div className="absolute inset-0 z-0 gpu-accelerated">
          <Image
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
            alt="Hero Background"
            fill
            priority
            quality={78}
            className="object-cover animate-slow-zoom opacity-52"
            sizes="(max-width: 768px) 100vw, 100vw"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.15),_transparent_34%),linear-gradient(180deg,rgba(2,6,23,0.16)_0%,rgba(2,6,23,0.72)_60%,rgba(2,6,23,0.94)_100%)]"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-8xl px-5 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-12 xl:gap-16">
            <div className="animate-slide-up space-y-8 sm:space-y-10 [animation-delay:0.08s]">
              <div className="inline-flex items-center gap-4 text-white/60">
                <span className="h-[1px] w-8 bg-white/40 sm:w-10"></span>
                <span className="text-[13px] font-bold tracking-[0.3em] uppercase">Gateway to SW Innovation</span>
              </div>

              <h1 className="max-w-4xl text-[clamp(2.8rem,8vw,5.4rem)] font-bold leading-[0.98] tracking-[-0.05em] text-white">
                Your Gateway to <br className="hidden sm:block" />
                <span className="text-white italic opacity-90">Entrepreneurship.</span>
              </h1>

              <p className="max-w-2xl text-[17px] font-medium leading-relaxed text-white/78 sm:text-[19px] lg:text-[21px]">
                한양대학교 ERICA SW창업캡스톤디자인 통합 플랫폼.
                <br className="hidden sm:block" />
                아이디어에서 기술 구현까지, 데이터 기반의 정교한 매칭으로
                <br className="hidden lg:block" />
                넥스트 유니콘으로의 여정을 함께합니다.
              </p>

              <div className="relative max-w-2xl animate-slide-up [animation-delay:0.18s]">
                <div className="group flex flex-col gap-4 rounded-[2rem] border border-white/12 bg-slate-950/42 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:p-2">
                  <div className="flex min-w-0 flex-1 items-center px-3 sm:px-6">
                    <Search className="mr-4 text-white/70" size={20} />
                    <input
                      type="text"
                      placeholder="Search for projects, teams or opportunities..."
                      className="h-12 w-full bg-transparent text-[15px] font-medium text-white outline-none placeholder:text-white/38 sm:h-16 sm:text-[16px]"
                    />
                  </div>
                  <div className="hidden h-10 w-px bg-white/12 sm:block"></div>
                  <button className="flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-[12px] font-bold uppercase tracking-[0.22em] text-slate-950 premium-transition hover:scale-[1.01] hover:bg-slate-100 sm:mx-2 sm:h-14 sm:px-7">
                    Search <ChevronRight size={16} />
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 px-2 sm:px-6">
                  {["#LMS", "#TeamBuilding", "#Capstone", "#Startup"].map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-bold text-white/55 premium-transition hover:border-white/20 hover:text-white">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid max-w-2xl grid-cols-2 gap-3 pt-2 text-white/68 sm:flex sm:flex-wrap sm:gap-6">
                {[
                  ["팀 빌딩", "데이터 기반 매칭"],
                  ["프로젝트 관리", "교육 흐름 통합"],
                  ["지원사업", "기회 탐색 최적화"],
                  ["포트폴리오", "성과 아카이빙"],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-md sm:min-w-[180px] sm:flex-1">
                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/44">{title}</p>
                    <p className="mt-2 text-[14px] font-semibold text-white/82">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 content-auto">
              {featureCards.map((card, i) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/12 bg-white/8 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.28)] backdrop-blur-xl premium-transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 sm:min-h-[210px] sm:p-7"
                  style={{ animationDelay: `${0.24 + i * 0.08}s` }}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70"></div>
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white premium-transition group-hover:bg-white group-hover:text-slate-950">
                      {card.icon}
                    </div>
                    <ChevronRight className="translate-x-0 text-white/35 premium-transition group-hover:translate-x-1 group-hover:text-white" size={20} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/42">{card.title}</p>
                    <h4 className="text-[22px] font-bold tracking-tight text-white sm:text-[24px]">
                      {card.label}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-900 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-8xl px-5 sm:px-6 lg:px-8">
          <div className="section-accent-bar mb-14 sm:mb-18 lg:mb-24">
            <h2 className="mb-4 text-[34px] font-black uppercase tracking-[-0.04em] text-slate-900 dark:text-slate-50 sm:text-[42px] lg:text-[48px]">Core Ecosystem</h2>
            <p className="max-w-2xl text-[17px] font-medium text-slate-600 dark:text-slate-400 sm:text-[19px]">기획부터 기술 구현, 팀매칭까지 창업의 전 과정을 지원합니다.</p>
          </div>

          <div className="grid grid-cols-1 border-l border-t border-slate-200 dark:border-slate-700 md:grid-cols-2 lg:grid-cols-3 content-auto">
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
            ].map((item) => (
              <div key={item.title} className="group relative overflow-hidden border-b border-r border-slate-200 p-8 premium-transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/70 sm:p-10 lg:p-12 xl:p-14">
                <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.22em] text-primary dark:text-blue-400">{item.category}</span>
                <h4 className="mb-4 text-[28px] font-black uppercase tracking-[-0.05em] text-slate-900 premium-transition group-hover:text-primary dark:text-slate-50 dark:group-hover:text-blue-400 lg:text-[32px]">{item.title}</h4>
                <p className="mb-10 text-[16px] font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-[17px] lg:min-h-[96px]">{item.desc}</p>
                <Button variant="ghost" className="p-0 text-slate-900 hover:bg-transparent dark:text-slate-50 gap-2">
                  View Details <ChevronRight size={18} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
