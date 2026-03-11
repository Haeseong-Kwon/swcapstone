import { memo } from "react";
import { User } from "@/types";
import { Badge } from "@/components/common/Badge";
import { motion } from "framer-motion";
import { Github, Globe, ExternalLink } from "lucide-react";

const ProfileCard = memo(({ user, index }: { user: User; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm p-6 hover:shadow-md transition-shadow relative overflow-hidden group gpu-accelerated"
  >
    {/* Status Badge */}
    <div className="absolute top-4 right-4 focus-within:z-10">
      <Badge variant={user.status === 'LOOKING' ? 'primary' : 'default'}>
        {user.status === 'LOOKING' ? '팀 찾는 중' : '팀 구성 완료'}
      </Badge>
    </div>

    <div className="flex items-start gap-4 mb-6">
      <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold text-xl overflow-hidden">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          user.name.charAt(0)
        )}
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">{user.name}</h3>
        <div className="flex justify-between items-center mt-2 gap-4">
          <div>
            <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-1">상태</p>
            <p className="text-sm font-black text-slate-900 dark:text-slate-50">{user.status === 'LOOKING' ? '팀 찾는 중' : '팀 구성 완료'}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-1">전공</p>
            <p className="text-sm font-black text-slate-900 dark:text-slate-50">{user.major}</p>
          </div>
        </div>
        <p className="text-xs font-semibold text-primary dark:text-blue-400 mt-2 uppercase tracking-wider">{user.specialty}</p>
      </div>
    </div>

    <div className="space-y-4">
      <div>
        <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-2">Technical Stacks</p>
        <div className="flex flex-wrap gap-2">
          {user.techStack?.map((stack) => (
            <Badge key={stack} className="lowercase px-3 text-slate-600 dark:text-slate-400">
              {stack}
            </Badge>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex gap-3">
        {user.githubUrl && (
          <a href={user.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors border border-slate-200 dark:border-slate-700">
            <Github size={18} />
          </a>
        )}
        {user.blogUrl && (
          <a href={user.blogUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors border border-slate-200 dark:border-slate-700">
            <Globe size={18} />
          </a>
        )}
        <button className="flex-1 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 text-xs font-bold py-2 px-4 rounded-none hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
          포트폴리오 보기 <ExternalLink size={14} />
        </button>
      </div>
    </div>
  </motion.div>
));

ProfileCard.displayName = "ProfileCard";

interface ProfileBoardProps {
  users: User[];
}

export function ProfileBoard({ users }: ProfileBoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user, index) => (
        <ProfileCard key={user.id} user={user} index={index} />
      ))}
    </div>
  );
}
