import { useState, memo } from "react";
import { RegisteredTeam } from "@/types";
import { Badge } from "@/components/common/Badge";
import { motion } from "framer-motion";
import { Plus, Users, Mail, ArrowRight } from "lucide-react";
import { TeamRegistrationModal } from "./TeamRegistrationModal";

const RegisteredTeamItem = memo(({ team, index }: { team: RegisteredTeam; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm p-6 hover:shadow-md hover:border-primary dark:hover:border-blue-400 transition-all group flex flex-col md:flex-row gap-6 items-start md:items-center gpu-accelerated rounded-2xl"
  >
    {/* Left: Status & Team Name */}
    <div className="flex flex-col gap-2 min-w-[180px]">
      <div className="flex items-center gap-2">
        <Badge variant={team.status === 'ACTIVE' ? 'success' : 'default'} className="px-2 py-0.5 text-[10px]">
          {team.status === 'ACTIVE' ? '활동중' : '프로젝트 완료'}
        </Badge>
      </div>
      <h3 className="text-xl font-black text-slate-900 dark:text-slate-50">{team.teamName}</h3>
      <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">
        대표: {team.leaderName}
      </p>
    </div>

    {/* Middle: Product Idea & Members */}
    <div className="flex-grow space-y-4">
      <div>
        <span className="text-[10px] font-bold text-primary dark:text-blue-400 uppercase tracking-widest mb-1 block">프로젝트 아이템</span>
        <p className="text-md font-bold text-slate-700 dark:text-slate-300 line-clamp-1">{team.productIdea}</p>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <Users size={14} className="text-slate-400" />
        {team.members.map((member, i) => (
          <div key={i} className="flex items-center text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-100 dark:border-slate-700">
            <span className="font-bold mr-1 text-slate-500">{member.role}</span>
            {member.name}
          </div>
        ))}
      </div>
    </div>

    {/* Right: Contact & Action */}
    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto gap-4 md:gap-3 shrink-0 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 pt-4 md:pt-0 md:pl-6">
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-primary transition-colors cursor-pointer">
        <Mail size={14} />
        {team.contactEmail}
      </div>
      <button className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shrink-0">
        <ArrowRight size={18} />
      </button>
    </div>
  </motion.div>
));

RegisteredTeamItem.displayName = "RegisteredTeamItem";

interface TeamRegistrationBoardProps {
  teams: RegisteredTeam[];
}

export function TeamRegistrationBoard({ teams: initialTeams }: TeamRegistrationBoardProps) {
  const [teams, setTeams] = useState<RegisteredTeam[]>(initialTeams);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegisterTeam = (newTeam: RegisteredTeam) => {
    setTeams([newTeam, ...teams]);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <TeamRegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleRegisterTeam} 
      />

      {/* Registration Button Header */}
      <div className="flex justify-end mb-2">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary dark:hover:bg-blue-400 hover:text-white premium-transition shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <Plus size={18} />
          팀 등록하기
        </button>
      </div>

      {/* List of Registered Teams */}
      <div className="flex flex-col gap-4">
        {teams.map((team, index) => (
          <RegisteredTeamItem key={team.id} team={team} index={index} />
        ))}
      </div>
    </div>
  );
}
