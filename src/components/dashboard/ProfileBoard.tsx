import { useState, memo } from "react";
import Image from "next/image";
import { User } from "@/types";
import { Badge } from "@/components/common/Badge";
import { Card } from "@/components/common/Card";
import { motion } from "framer-motion";
import { Github, Globe, ExternalLink, UserPlus } from "lucide-react";
import { ProfileUploadModal } from "./ProfileUploadModal";

const ProfileCard = memo(({ user, index }: { user: User; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
  >
    <Card className="p-6 h-full border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group gpu-accelerated bg-white dark:bg-slate-900 rounded-2xl">
      {/* Status Badge */}
      <div className="absolute top-4 right-4 focus-within:z-10">
        <Badge variant={user.status === 'LOOKING' ? 'primary' : 'default'}>
          {user.status === 'LOOKING' ? '팀 찾는 중' : '팀 구성 완료'}
        </Badge>
      </div>

      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold text-xl overflow-hidden">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
              {user.name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">{user.name}</h3>
          <div className="flex justify-between items-center mt-2 gap-4">
            <div>
              <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-1">상태</p>
              <p className="text-sm font-black text-slate-900 dark:text-slate-50">{user.status === 'LOOKING' ? '팀 찾는 중' : '팀 구성 완료'}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-1">전공</p>
              <p className="text-sm font-black text-slate-900 dark:text-slate-50">{user.major}</p>
            </div>
          </div>
          <p className="text-xs font-semibold text-primary dark:text-blue-400 mt-2 uppercase tracking-wider">{user.specialty}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-[10px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest mb-2">Technical Stacks</p>
          <div className="flex flex-wrap gap-2">
            {user.techStack?.map((stack) => (
              <Badge key={stack} className="lowercase px-3 text-slate-700 dark:text-slate-300 bg-slate-100/50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                {stack}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex gap-3">
          {user.githubUrl && (
            <a href={user.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 transition-colors border border-slate-200 dark:border-slate-700">
              <Github size={18} />
            </a>
          )}
          {user.blogUrl && (
            <a href={user.blogUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 transition-colors border border-slate-200 dark:border-slate-700">
              <Globe size={18} />
            </a>
          )}
          <button className="flex-1 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 text-xs font-bold py-2 px-4 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
            포트폴리오 보기 <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </Card>
  </motion.div>
));

ProfileCard.displayName = "ProfileCard";

interface ProfileBoardProps {
  users: User[];
}

export function ProfileBoard({ users: initialUsers }: ProfileBoardProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUploadProfile = (newUser: User) => {
    setUsers([newUser, ...users]);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <ProfileUploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleUploadProfile} 
      />

      <div className="flex justify-end mb-2">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary dark:hover:bg-blue-400 hover:text-white premium-transition shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <UserPlus size={18} />
          소개글 업로드
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <ProfileCard key={user.id} user={user} index={index} />
        ))}
      </div>
    </div>
  );
}
