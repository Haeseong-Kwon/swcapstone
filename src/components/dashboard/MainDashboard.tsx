"use client";

import { useState, useCallback, memo } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ProfileBoard } from "./ProfileBoard";
import { TeamBoard } from "./TeamBoard";
import { CorporateBoard } from "./CorporateBoard";
import { VideoBoard } from "./VideoBoard";
import { TeamRegistrationBoard } from "./TeamRegistrationBoard";
import { MOCK_USERS, MOCK_TEAM_POSTS, MOCK_PROPOSALS, MOCK_VIDEOS, MOCK_REGISTERED_TEAMS } from "@/constants/mockData";
import { cn } from "@/lib/utils";

type TabType = 'SELF_INTRO' | 'TEAM_BUILDING' | 'TEAM_REGISTRATION' | 'CORPORATE' | 'EDUCATIONAL_VIDEO';

const TABS: { id: TabType; label: string }[] = [
  { id: 'SELF_INTRO', label: '자기소개' },
  { id: 'TEAM_BUILDING', label: '팀원 모집' },
  { id: 'TEAM_REGISTRATION', label: '팀 등록' },
  { id: 'CORPORATE', label: '기업제안 프로젝트' },
  { id: 'EDUCATIONAL_VIDEO', label: '교육 영상' },
];

export const MainDashboard = memo(function MainDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('SELF_INTRO');

  const handleTabChange = useCallback((id: TabType) => {
    setActiveTab(id);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full transform-gpu">
        <div className="mb-8 flex flex-wrap gap-2 rounded-[1.75rem] border border-border bg-background/88 p-2 shadow-sm backdrop-blur-md sm:mb-10 lg:mb-12">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "relative rounded-2xl px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] premium-transition sm:px-6 sm:py-4 sm:text-xs lg:px-8",
                activeTab === tab.id ? "text-slate-900 dark:text-slate-50" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <m.div
                  layoutId="activeTabDashboard"
                  className="absolute inset-0 -z-10 rounded-2xl bg-white dark:bg-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] border border-slate-200/50 dark:border-white/10"
                  transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="min-h-[600px] content-auto">
          <m.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="transform-gpu"
          >
            {activeTab === 'SELF_INTRO' && <ProfileBoard users={MOCK_USERS} />}
            {activeTab === 'TEAM_BUILDING' && <TeamBoard posts={MOCK_TEAM_POSTS} />}
            {activeTab === 'TEAM_REGISTRATION' && <TeamRegistrationBoard teams={MOCK_REGISTERED_TEAMS} />}
            {activeTab === 'CORPORATE' && <CorporateBoard proposals={MOCK_PROPOSALS} />}
            {activeTab === 'EDUCATIONAL_VIDEO' && <VideoBoard videos={MOCK_VIDEOS} />}
          </m.div>
        </div>
      </div>
    </LazyMotion>
  );
});

MainDashboard.displayName = "MainDashboard";
