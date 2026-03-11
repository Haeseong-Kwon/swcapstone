import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Search, ChevronRight, Menu, Presentation, Rocket, Users, Briefcase } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50">
      {/* High-Fidelity Hero Section */}
      <section className="relative min-h-[900px] flex items-center pt-24 overflow-hidden bg-black">
        {/* Background Layer with IT/Startup Theme */}
        <div className="absolute inset-0 z-0 gpu-accelerated">
          <Image
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
            alt="Hero Background"
            fill
            priority
            quality={90}
            className="object-cover animate-slow-zoom opacity-60"
            sizes="100vw"
          />
          {/* Deep Blue Atmospheric Overlay */}
          <div className="absolute inset-0 bg-[#001A2C]/40 backdrop-blur-[1px]"></div>
          {/* Bottom Gradient for Content Transition (Always Dark) */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80"></div>
        </div>

        <div className="max-w-8xl mx-auto px-10 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center">

            {/* Left Side: Main Content */}
            <div className="space-y-12 animate-slide-up [animation-delay:0.1s]">
              <div className="inline-flex items-center gap-4 text-white/60">
                <span className="w-10 h-[1px] bg-white/40"></span>
                <span className="text-[13px] font-bold tracking-[0.3em] uppercase">Gateway to SW Innovation</span>
              </div>

              <h1 className="text-[64px] md:text-[82px] font-bold text-white tracking-tighter leading-[1.1]">
                Your Gateway to <br />
                <span className="text-white italic opacity-90">Entrepreneurship.</span>
              </h1>

              <p className="text-[22px] text-white/80 max-w-2xl leading-relaxed font-medium">
                한양대학교 ERICA SW창업캡스톤디자인 통합 플랫폼. <br />
                아이디어에서 기술 구현까지, 데이터 기반의 정교한 매칭으로 <br />
                넥스트 유니콘으로의 여정을 함께합니다.
              </p>

              {/* Glassmorphism Search Bar */}
              <div className="relative max-w-xl group animate-slide-up [animation-delay:0.3s]">
                <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-full h-20 flex items-center px-10 group-focus-within:border-white/20 group-focus-within:bg-slate-900/60 premium-transition">
                  <Search className="text-white/80 mr-6" size={24} />
                  <input
                    type="text"
                    placeholder="Search for projects, teams or opportunities..."
                    className="bg-transparent border-none outline-none text-white w-full text-[17px] placeholder:text-white/40 font-medium"
                  />
                  <div className="h-10 w-[1px] bg-white/20 mx-6"></div>
                  <button className="text-white/80 hover:text-white flex items-center gap-2 text-[14px] font-bold uppercase tracking-widest premium-transition">
                    Search <ChevronRight size={18} />
                  </button>
                </div>
                {/* Popular Keywords */}
                <div className="flex gap-4 mt-6 px-10">
                  {["#LMS", "#TeamBuilding", "#Capstone", "#Startup"].map(tag => (
                    <span key={tag} className="text-[12px] font-bold text-white/50 hover:text-white cursor-pointer premium-transition">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Glassmorphism Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 animate-slide-up [animation-delay:0.5s]">
              {[
                { title: "Course 01", label: "Business Strategy", icon: <Presentation size={32} />, delay: "0.6s" },
                { title: "Course 02", label: "Tech Build", icon: <Rocket size={32} />, delay: "0.7s" },
                { title: "팀빌딩", label: "Team Matching", icon: <Users size={32} />, delay: "0.8s" },
                { title: "SW창업캡스톤디자인", label: "Dashboard", icon: <Briefcase size={32} />, delay: "0.9s" }
              ].map((card, i) => (
                <Link
                  key={i}
                  href={card.title === "SW창업캡스톤디자인" ? "/dashboard" : "/community"}
                  className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-lg p-8 md:p-10 h-[200px] md:h-[240px] flex flex-col justify-between hover:bg-slate-900/60 hover:border-white/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out group relative animate-slide-up"
                  style={{ animationDelay: card.delay }}
                >
                  <div className="text-white/80 group-hover:text-white group-hover:scale-110 premium-transition transform origin-left">
                    {card.icon}
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em]">{card.title}</p>
                    <h4 className="text-[22px] font-bold text-white tracking-tight flex items-center justify-between">
                      {card.label}
                      <ChevronRight className="opacity-30 group-hover:opacity-100 group-hover:translate-x-2 premium-transition" size={20} />
                    </h4>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Intro Section - Standard Clean White */}
      <section className="py-40 bg-white dark:bg-slate-900">
        <div className="max-w-8xl mx-auto px-10">
          <div className="section-accent-bar mb-24">
            <h2 className="text-[48px] font-black text-slate-900 dark:text-slate-50 tracking-tighter uppercase mb-4">Core Ecosystem</h2>
            <p className="text-[20px] text-slate-600 dark:text-slate-400 max-w-2xl font-medium">기획부터 기술 구현, 팀매칭까지 창업의 전 과정을 지원합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-slate-200 dark:border-slate-700">
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
              <div key={i} className="group relative overflow-hidden border-r border-b border-slate-200 dark:border-slate-700 p-16 premium-transition hover:bg-slate-50 dark:hover:bg-slate-800">
                <span className="text-[12px] font-bold text-primary dark:text-blue-400 tracking-[0.2em] uppercase mb-6 block">{item.category}</span>
                <h4 className="text-[32px] font-black text-slate-900 dark:text-slate-50 tracking-tighter uppercase mb-4 group-hover:text-primary dark:group-hover:text-blue-400 premium-transition">{item.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 font-medium mb-12 text-[18px] leading-relaxed">{item.desc}</p>
                <Button variant="ghost" className="p-0 hover:bg-transparent text-slate-900 dark:text-slate-50 gap-2">
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
