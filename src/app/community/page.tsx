"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { Search, Plus, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubPageHero } from "@/components/common/SubPageHero";
import { TeamBuildingPost } from "@/types";
import { RecruitmentUploadModal } from "@/components/dashboard/RecruitmentUploadModal";
import { getRecruitmentPosts, createRecruitmentPost } from "@/lib/services/BoardServices";
import { RecruitmentPostDetailModal } from "@/components/community/RecruitmentPostDetailModal";

const TABS = ['ALL', 'IDEA', 'MVP'] as const;
type ActiveTab = typeof TABS[number];

const CommunityCard = memo(({
  post,
  index,
  onOpen,
}: {
  post: TeamBuildingPost;
  index: number;
  onOpen: (post: TeamBuildingPost) => void;
}) => (
  <m.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-7 premium-transition hover:-translate-y-1 hover:shadow-2xl hover:border-primary dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-400 sm:p-9 lg:p-10 contain-layout-paint"
  >
    <div className="relative z-10 flex flex-col h-full space-y-7 sm:space-y-8">
      <div className="flex items-center justify-between">
        <Badge variant={post.projectPhase === 'IDEA' ? 'primary' : 'success'} className="px-3 py-1 text-[10px] font-black rounded-lg">
          {post.projectPhase} Phase
        </Badge>
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          <Clock size={14} className="opacity-60" />
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="flex-grow space-y-4">
        <h3 className="line-clamp-2 text-[24px] font-black uppercase leading-[1.1] tracking-[-0.03em] text-slate-900 group-hover:text-primary dark:text-slate-50 dark:group-hover:text-blue-400 premium-transition sm:text-[28px]">
          {post.title}
        </h3>
        <p className="line-clamp-3 text-[15px] font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-[16px]">
          {post.content}
        </p>
      </div>

      <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-4">Recruiting</p>
          <div className="flex flex-wrap gap-2">
            {post.recruitingRoles?.map((role) => (
              <span key={role.role} className="inline-flex items-center rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-700 premium-transition group-hover:bg-slate-900 group-hover:text-white dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-white dark:group-hover:text-slate-950">
                {role.role}
                <span className="ml-2 opacity-50">{role.current}/{role.total}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 flex items-center justify-center font-black text-lg group-hover:scale-110 premium-transition shadow-lg">
              {post.authorName ? post.authorName[0] : "?"}
            </div>
            <div>
              <p className="text-sm font-black text-slate-900 dark:text-slate-50">{post.authorName}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Founder</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onOpen(post)}
            className="flex h-10 items-center justify-center rounded-xl bg-slate-50 px-5 text-[11px] font-black uppercase tracking-widest text-slate-900 hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-blue-400 premium-transition"
          >
            View Idea
          </button>
        </div>
      </div>
    </div>
    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.01] premium-transition pointer-events-none" />
  </m.div>
));

CommunityCard.displayName = "CommunityCard";

export default function CommunityPage() {
    const [activeTab, setActiveTab] = useState<ActiveTab>('ALL');
    const [posts, setPosts] = useState<TeamBuildingPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<TeamBuildingPost | null>(null);

    const fetchPosts = useCallback(async () => {
      try {
        setLoading(true);
        const data = await getRecruitmentPosts();
        const mappedData: TeamBuildingPost[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          content: item.content,
          authorId: item.author_id,
          authorName: item.author?.full_name || "알 수 없음",
          tags: item.tags || [],
          projectPhase: item.project_phase || 'IDEA',
          recruitingRoles: item.recruiting_roles || [],
          courseBadge: item.course_badge || 'CAPSTONE_1',
          createdAt: item.created_at
        }));
        setPosts(mappedData);
      } catch (error) {
        console.error("Error fetching community posts:", error);
      } finally {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      fetchPosts();
    }, [fetchPosts]);

    const handleUploadPost = useCallback(async (newPost: TeamBuildingPost) => {
      try {
        const dbPost = {
          title: newPost.title,
          content: newPost.content,
          tags: newPost.tags,
          recruiting_roles: newPost.recruitingRoles,
          project_phase: newPost.projectPhase,
          course_badge: newPost.courseBadge,
          status: 'Recruiting'
        };
        await createRecruitmentPost(dbPost);
        await fetchPosts();
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error uploading post:", error);
        alert("모집글 업로드 중 오류가 발생했습니다.");
      }
    }, [fetchPosts]);

    const filteredPosts = activeTab === 'ALL'
        ? posts
        : posts.filter(post => post.projectPhase === activeTab);

    return (
        <main className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 transform-gpu">
            <RecruitmentUploadModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={handleUploadPost} 
            />
            <RecruitmentPostDetailModal
                isOpen={!!selectedPost}
                post={selectedPost}
                onClose={() => setSelectedPost(null)}
            />

            <SubPageHero
                title="Networking"
                description="최고의 기술력과 아이디어를 가진 팀원들을 찾아 열정적인 프로젝트를 시작하세요."
                backgroundImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
            >
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  variant="outline" 
                  size="lg" 
                  className="bg-white text-black border-white hover:bg-primary hover:text-white hover:border-primary gap-3 sm:gap-4 h-14 sm:h-18 px-8 sm:px-14 group/post shadow-2xl w-full sm:w-auto transform-gpu active:scale-95 transition-all"
                >
                    <Plus size={20} className="sm:size-[24px] group-hover:rotate-90 premium-transition" />
                    <span className="text-[13px] sm:text-[14px]">Create New Proposal</span>
                </Button>
            </SubPageHero>

            <div className="mx-auto max-w-8xl px-5 py-16 animate-slide-up sm:px-6 sm:py-20 lg:px-8 lg:py-24 [animation-delay:0.1s]">
                <LazyMotion features={domAnimation}>
                    <div className="mb-14 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                        <div className="inline-flex items-center gap-1 overflow-x-auto no-scrollbar p-1 rounded-2xl bg-slate-100/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 w-full sm:w-fit">
                            {TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        "relative flex-grow sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-black tracking-[0.18em] uppercase premium-transition rounded-xl z-10",
                                        activeTab === tab
                                            ? "text-slate-900 dark:text-slate-50"
                                            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                                    )}
                                >
                                    <span className="relative z-10">{tab === 'ALL' ? 'Everything' : tab}</span>
                                    {activeTab === tab && (
                                        <m.div
                                            layoutId="activeTabCommunity"
                                            className="absolute inset-0 rounded-xl bg-white dark:bg-slate-700 shadow-sm border border-slate-200/50 dark:border-white/10"
                                            transition={{ type: "spring", stiffness: 350, damping: 35 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full lg:max-w-[460px] group">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-primary premium-transition">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by tech stack, role, or vision..."
                                className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-6 text-[15px] font-semibold tracking-tight text-slate-900 outline-none shadow-[0_2px_8px_rgba(0,0,0,0.04)] premium-transition placeholder:text-slate-400 focus:ring-2 focus:ring-primary/10 focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:focus:border-blue-400 sm:h-16 sm:text-[16px]"
                            />
                        </div>
                    </div>

                    {loading && posts.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-500">
                        <Loader2 className="animate-spin text-primary" size={40} />
                        <p className="font-bold tracking-widest uppercase text-xs">Syncing Community Posts...</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 xl:gap-10 content-auto">
                              <AnimatePresence mode="popLayout">
                              {filteredPosts.map((post, i) => (
                                  <CommunityCard key={post.id} post={post} index={i} onOpen={setSelectedPost} />
                              ))}
                          </AnimatePresence>
                          
                          {filteredPosts.length === 0 && !loading && (
                            <div className="col-span-full text-center py-20 text-slate-400 bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
                              <p className="font-bold text-sm">등록된 모집글이 없습니다. 첫 번째 영감을 공유해보세요!</p>
                            </div>
                          )}
                      </div>
                    )}
                </LazyMotion>
            </div>
        </main>
    );
}
