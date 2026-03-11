import { SubPageHero } from "@/components/common/SubPageHero";
import { MOCK_PORTFOLIOS } from "@/constants/mockData";
import { Play, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PortfolioPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            {/* Dark/High-Contrast Intro (Cheil Style) */}
            <SubPageHero
                title="PORTFOLIO"
                description="We accelerate the most ambitious ideas into reality."
                backgroundImage="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="py-24 max-w-8xl mx-auto px-6 md:px-12">
                {/* Minimalist Section Header */}
                <div className="mb-20 animate-slide-up [animation-delay:0.1s]">
                    <h2 className="text-[12vw] leading-[0.9] md:text-[8rem] font-bold tracking-tighter uppercase">
                        Our<br />
                        <span className="opacity-40 italic">Projects</span>
                    </h2>
                    <p className="mt-8 text-xl text-white/60 max-w-2xl font-medium tracking-tight">
                        세상을 바꾸는 기술과 혁신적인 비즈니스 모델. 한양대학교가 발굴하고 투자한 우수 창업팀의 결과물을 확인하세요.
                    </p>
                </div>

                {/* Masonry / Grid Layout for Portfolios */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    {MOCK_PORTFOLIOS.map((item, index) => (
                        <div
                            key={item.id}
                            className="group relative animate-slide-up"
                            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                        >
                            {/* Card Container */}
                            <div className="relative aspect-[4/5] md:aspect-square w-full overflow-hidden bg-[#111] isolate">
                                {/* Thumbnail Image */}
                                <Image
                                    src={item.thumbnailUrl}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-50"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />

                                {/* Overlay Content (Always visible to some extent, distinct on hover) */}
                                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between mix-blend-difference z-10 transition-opacity duration-500">
                                    <div className="flex justify-between items-start">
                                        <span className="text-xl md:text-2xl font-bold tracking-tighter">
                                            {item.client}
                                        </span>
                                        <span className="text-lg md:text-xl font-medium tracking-tight">
                                            {item.year}
                                        </span>
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight max-w-[80%]">
                                        {item.title}
                                    </h3>
                                </div>

                                {/* Hover Action Overlay */}
                                <div className="absolute inset-0 p-8 md:p-12 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 bg-black/40 backdrop-blur-sm">
                                    {item.videoUrl && (
                                        <Link href={item.videoUrl} className="flex flex-col items-center gap-3 text-white hover:text-primary transition-colors">
                                            <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all">
                                                <Play size={28} className="ml-2" />
                                            </div>
                                            <span className="text-sm font-bold tracking-widest uppercase">Play Video</span>
                                        </Link>
                                    )}
                                    {item.irDeckUrl && (
                                        <Link href={item.irDeckUrl} className="flex flex-col items-center gap-3 text-white hover:text-primary transition-colors">
                                            <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all">
                                                <Download size={28} />
                                            </div>
                                            <span className="text-sm font-bold tracking-widest uppercase">IR Deck</span>
                                        </Link>
                                    )}
                                </div>
                            </div>
                            
                            {/* Metadata below card */}
                            <div className="mt-6 flex flex-wrap gap-3">
                                {item.categories.map((cat, i) => (
                                    <span key={i} className="text-xs font-bold tracking-widest uppercase text-white/40 border border-white/20 rounded-full px-4 py-1">
                                        {cat}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
