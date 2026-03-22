"use client";

import { useState, useCallback, memo } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ProfileBoard } from "./ProfileBoard";
import { TeamBoard } from "./TeamBoard";
import { CorporateBoard } from "./CorporateBoard";
import { VideoBoard } from "./VideoBoard";
import { TeamRegistrationBoard } from "./TeamRegistrationBoard";
import { cn } from "@/lib/utils";
import { getCurrentSemesterOption, getSemesterOptions, SemesterOption } from "@/lib/semester";

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
  const semesterOptions = getSemesterOptions();
  const currentSemester = getCurrentSemesterOption();
  const [activeSemesterKey, setActiveSemesterKey] = useState<string>(currentSemester.key);

  const activeSemester =
    semesterOptions.find((semester) => semester.key === activeSemesterKey) ?? currentSemester;

  const handleTabChange = useCallback((id: TabType) => {
    setActiveTab(id);
  }, []);

  const handleSemesterChange = useCallback((semester: SemesterOption) => {
    setActiveSemesterKey(semester.key);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full transform-gpu">
        <div className="mb-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 lg:mb-10 lg:p-8">
          <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.26em] text-primary dark:text-blue-400">
                Semester Cohort
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50">
                학기별 운영 단위로 과목관리를 분리합니다
              </h2>
              <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                자기소개, 팀 모집, 팀 등록, 기업제안 프로젝트는 선택한 학기 cohort 기준으로만 조회되고 등록됩니다.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-950 px-5 py-4 text-white dark:bg-white dark:text-slate-900">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] opacity-60">Current Focus</p>
              <p className="mt-1 text-lg font-black">{activeSemester.courseLabel}</p>
              <p className="text-sm font-semibold opacity-80">{activeSemester.label}</p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {semesterOptions.map((semester) => (
              <button
                key={semester.key}
                type="button"
                onClick={() => handleSemesterChange(semester)}
                className={cn(
                  "rounded-[1.5rem] border px-5 py-4 text-left premium-transition",
                  activeSemester.key === semester.key
                    ? "border-slate-900 bg-slate-900 text-white shadow-xl dark:border-white dark:bg-white dark:text-slate-900"
                    : "border-slate-200 bg-slate-50/80 text-slate-900 hover:border-primary hover:bg-white dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-50 dark:hover:border-blue-400"
                )}
              >
                <p className="text-[10px] font-black uppercase tracking-[0.24em] opacity-60">{semester.courseLabel}</p>
                <p className="mt-2 text-lg font-black">{semester.label}</p>
                <p className="mt-1 text-xs font-semibold opacity-80">{semester.description}</p>
              </button>
            ))}
          </div>
        </div>

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
            key={`${activeSemester.key}-${activeTab}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="transform-gpu"
          >
            {activeTab === 'SELF_INTRO' && <ProfileBoard activeSemester={activeSemester} />}
            {activeTab === 'TEAM_BUILDING' && <TeamBoard activeSemester={activeSemester} />}
            {activeTab === 'TEAM_REGISTRATION' && <TeamRegistrationBoard activeSemester={activeSemester} />}
            {activeTab === 'CORPORATE' && <CorporateBoard activeSemester={activeSemester} />}
            {activeTab === 'EDUCATIONAL_VIDEO' && <VideoBoard />}
          </m.div>
        </div>
      </div>
    </LazyMotion>
  );
});

MainDashboard.displayName = "MainDashboard";
