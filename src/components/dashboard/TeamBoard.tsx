import { useState, memo, useCallback, useEffect } from "react";
import { TeamBuildingPost } from "@/types";
import { Badge } from "@/components/common/Badge";
import { Card } from "@/components/common/Card";
import { motion } from "framer-motion";
import { Users, Calendar, PlusCircle, Loader2 } from "lucide-react";
import { RecruitmentUploadModal } from "./RecruitmentUploadModal";
import { getRecruitmentPosts, createRecruitmentPost } from "@/lib/services/BoardServices";
import { RecruitmentPostDetailModal } from "@/components/community/RecruitmentPostDetailModal";
import { SemesterOption } from "@/lib/semester";

const TeamCard = memo(({
  post,
  index,
  onOpen,
}: {
  post: TeamBuildingPost;
  index: number;
  onOpen: (post: TeamBuildingPost) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
  >
    <Card className="p-8 h-full border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group gpu-accelerated bg-white dark:bg-slate-900 rounded-2xl overflow-visible hover:-translate-y-2 transform-gpu">
      <div className="flex justify-between items-start mb-6">
        <Badge variant={post.courseBadge === 'CAPSTONE_1' ? 'info' : 'warning'}>
          {post.courseBadge === 'CAPSTONE_1' ? '캡스톤 1' : '캡스톤 2'}
        </Badge>
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
          <Calendar size={14} />
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors line-clamp-1">
        {post.title}
      </h3>
      <p className="text-slate-700 dark:text-slate-300 text-sm mb-8 line-clamp-2 leading-relaxed">
        {post.content}
      </p>

      <div className="space-y-6">
        <div>
          <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-3">구인 현황</p>
          <div className="flex flex-wrap gap-3">
            {post.recruitingRoles?.map((role) => (
              <div key={role.role} className="flex items-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-50 mr-3">{role.role}</span>
                <div className="flex gap-1">
                  {Array.from({ length: role.total }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full ${i < role.current ? 'bg-primary dark:bg-blue-400' : 'bg-slate-300 dark:bg-slate-600'}`} 
                    />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 ml-3">
                  {role.current}/{role.total}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500 dark:text-slate-400 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                {post.authorName.charAt(0)}
              </div>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-50">{post.authorName}</span>
          </div>
          <button
            type="button"
            onClick={() => onOpen(post)}
            className="text-xs font-black uppercase tracking-widest text-primary dark:text-blue-400 hover:translate-x-1 transition-transform flex items-center gap-2"
          >
            자세히 보기 <Users size={16} />
          </button>
        </div>
      </div>
    </Card>
  </motion.div>
));

TeamCard.displayName = "TeamCard";

export const TeamBoard = memo(function TeamBoard({ activeSemester }: { activeSemester: SemesterOption }) {
  const [posts, setPosts] = useState<TeamBuildingPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<TeamBuildingPost | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getRecruitmentPosts(activeSemester.key);
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
      console.error("Error fetching recruitment posts:", error);
    } finally {
      setLoading(false);
    }
  }, [activeSemester.key]);

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
        status: 'Recruiting',
        semester_key: activeSemester.key,
        academic_year: activeSemester.year,
        academic_term: activeSemester.term,
        course_track: activeSemester.courseTrack,
      };
      await createRecruitmentPost(dbPost);
      await fetchPosts();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error uploading post:", error);
      alert(error instanceof Error ? error.message : "모집글 업로드 중 오류가 발생했습니다.");
    }
  }, [activeSemester, fetchPosts]);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  if (loading && posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-500">
        <Loader2 className="animate-spin" size={40} />
        <p className="font-bold tracking-widest uppercase text-xs">Loading Recruitment Posts...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 transform-gpu">
      <RecruitmentUploadModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onSubmit={handleUploadPost}
        activeSemester={activeSemester}
      />
      <RecruitmentPostDetailModal
        isOpen={!!selectedPost}
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />

      <div className="mb-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Active Semester</p>
          <p className="mt-1 text-sm font-black text-slate-900 dark:text-slate-50">
            {activeSemester.label} · {activeSemester.courseLabel}
          </p>
        </div>
        <button 
          onClick={openModal}
          className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary dark:hover:bg-blue-400 hover:text-white premium-transition shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <PlusCircle size={18} />
          모집글 업로드
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 transform-gpu">
        {posts.map((post, index) => (
          <TeamCard key={post.id} post={post} index={index} onOpen={setSelectedPost} />
        ))}
      </div>
    </div>
  );
});

TeamBoard.displayName = "TeamBoard";
