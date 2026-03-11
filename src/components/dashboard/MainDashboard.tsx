"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export function MainDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('SELF_INTRO');

  return (
    <div className="w-full">
      {/* Unified Translucent Tabs Navigation (Dark Centric) */}
      <div className="flex glass-header px-2 mb-12 rounded-none border-border/10">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-8 py-6 text-sm font-black tracking-widest relative transition-all uppercase",
              activeTab === tab.id ? "text-slate-900 dark:text-slate-50" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabDashboard"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content with Smooth Transitions */}
      <div className="min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'SELF_INTRO' && <ProfileBoard users={MOCK_USERS} />}
            {activeTab === 'TEAM_BUILDING' && <TeamBoard posts={MOCK_TEAM_POSTS} />}
            {activeTab === 'TEAM_REGISTRATION' && <TeamRegistrationBoard teams={MOCK_REGISTERED_TEAMS} />}
            {activeTab === 'CORPORATE' && <CorporateBoard proposals={MOCK_PROPOSALS} />}
            {activeTab === 'EDUCATIONAL_VIDEO' && <VideoBoard videos={MOCK_VIDEOS} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
