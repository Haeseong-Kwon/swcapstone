"use client";

import { SectionHeader } from "@/components/common/SectionHeader";
import { MainDashboard } from "@/components/dashboard/MainDashboard";
import { SubPageHero } from "@/components/common/SubPageHero";

export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <SubPageHero
                title="Management"
                description="분절된 창업 교육 과정을 하나의 데이터로 연결하는 지능형 관리 시스템입니다."
                backgroundImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
            />

            <div className="mx-auto max-w-8xl px-5 py-10 sm:py-16 lg:py-24">
                <div className="mb-6 flex items-center justify-between border-b border-border pb-4 sm:mb-10 sm:pb-8 lg:mb-16 lg:pb-12">
                    <SectionHeader
                        title="Comprehensive Dashboard"
                        description="분절된 정보를 통합하여 창업 생태계의 모든 과정을 한눈에 파악하고 관리합니다."
                    />
                </div>

                <div className="min-h-[600px]">
                    <MainDashboard />
                </div>
            </div>
        </main>
    );
}
