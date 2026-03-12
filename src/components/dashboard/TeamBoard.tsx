import { useState, memo } from "react";
import { TeamBuildingPost } from "@/types";
import { Badge } from "@/components/common/Badge";
import { Card } from "@/components/common/Card";
import { motion } from "framer-motion";
import { Users, Calendar, PlusCircle } from "lucide-react";
import { RecruitmentUploadModal } from "./RecruitmentUploadModal";

const TeamCard = memo(({ post, index }: { post: TeamBuildingPost; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -15 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
  >
    <Card className="p-8 h-full border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group gpu-accelerated bg-white dark:bg-slate-900 rounded-2xl">
      <div className="flex justify-between items-start mb-6">
        <Badge variant={post.courseBadge === 'CAPSTONE_1' ? 'info' : 'warning'}>
          {post.courseBadge === 'CAPSTONE_1' ? '캡스톤 1' : '캡스톤 2'}
        </Badge>
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
          <Calendar size={14} />
          {post.createdAt}
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
            {post.recruitingRoles.map((role) => (
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
          <button className="text-xs font-black uppercase tracking-widest text-primary dark:text-blue-400 hover:translate-x-1 transition-transform flex items-center gap-2">
            자세히 보기 <Users size={16} />
          </button>
        </div>
      </div>
    </Card>
  </motion.div>
));

TeamCard.displayName = "TeamCard";

interface TeamBoardProps {
  posts: TeamBuildingPost[];
}

export function TeamBoard({ posts: initialPosts }: TeamBoardProps) {
  const [posts, setPosts] = useState<TeamBuildingPost[]>(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUploadPost = (newPost: TeamBuildingPost) => {
    setPosts([newPost, ...posts]);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <RecruitmentUploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleUploadPost} 
      />

      <div className="flex justify-end mb-2">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary dark:hover:bg-blue-400 hover:text-white premium-transition shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <PlusCircle size={18} />
          모집글 업로드
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post, index) => (
          <TeamCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </div>
  );
}
