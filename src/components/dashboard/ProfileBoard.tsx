import { useState, memo, useCallback, useEffect } from "react";
import Image from "next/image";
import { User } from "@/types";
import { Badge } from "@/components/common/Badge";
import { Card } from "@/components/common/Card";
import { motion } from "framer-motion";
import { Github, Globe, ExternalLink, UserPlus, Loader2 } from "lucide-react";
import { ProfileUploadModal } from "./ProfileUploadModal";
import { getProfiles, createProfile } from "@/lib/services/BoardServices";

const ProfileCard = memo(({ user, index }: { user: User; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
  >
    <Card className="p-6 h-full border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all relative overflow-visible group gpu-accelerated bg-white dark:bg-slate-900 rounded-2xl hover:-translate-y-2">
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

export const ProfileBoard = memo(function ProfileBoard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProfiles();
      const mappedData: User[] = data.map((item: any) => ({
        id: item.id,
        name: item.full_name,
        email: "",
        role: item.role as any,
        avatar: item.avatar_url,
        specialty: item.bio,
        major: item.major,
        techStack: item.tech_stack,
        status: item.status as any || 'LOOKING',
        githubUrl: item.github_url,
        blogUrl: item.portfolio_url
      }));
      setUsers(mappedData);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUploadProfile = useCallback(async (newUser: User) => {
    try {
      const dbUser = {
        full_name: newUser.name,
        major: newUser.major,
        bio: newUser.specialty,
        tech_stack: newUser.techStack,
        github_url: newUser.githubUrl,
        portfolio_url: newUser.blogUrl,
        role: newUser.role
      };
      await createProfile(dbUser);
      await fetchUsers(); // Refresh the list
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error uploading profile:", error);
      alert("업로드 중 오류가 발생했습니다.");
    }
  }, [fetchUsers]);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  if (loading && users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-500">
        <Loader2 className="animate-spin" size={40} />
        <p className="font-bold tracking-widest uppercase text-xs">Loading Profiles...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 transform-gpu">
      <ProfileUploadModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onSubmit={handleUploadProfile} 
      />

      <div className="flex justify-end mb-2">
        <button 
          onClick={openModal}
          className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary dark:hover:bg-blue-400 hover:text-white premium-transition shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <UserPlus size={18} />
          소개글 업로드
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transform-gpu">
        {users.map((user, index) => (
          <ProfileCard key={user.id} user={user} index={index} />
        ))}
      </div>
    </div>
  );
});

ProfileBoard.displayName = "ProfileBoard";
