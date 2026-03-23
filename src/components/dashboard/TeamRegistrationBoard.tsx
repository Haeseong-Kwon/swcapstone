import { useState, memo, useCallback, useEffect } from "react";
import { RegisteredTeam } from "@/types";
import { Badge } from "@/components/common/Badge";
import { motion } from "framer-motion";
import { Plus, Users, Mail, ArrowRight, Loader2 } from "lucide-react";
import { TeamRegistrationModal } from "./TeamRegistrationModal";
import { getTeamRegistrations, registerTeam } from "@/lib/services/BoardServices";
import { SemesterOption } from "@/lib/semester";

const RegisteredTeamItem = memo(({ team, index }: { team: RegisteredTeam; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm p-6 hover:shadow-md hover:border-primary dark:hover:border-blue-400 transition-all group flex flex-col md:flex-row gap-6 items-start md:items-center gpu-accelerated rounded-2xl transform-gpu"
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
      <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 transition-colors cursor-pointer">
        <Mail size={14} />
        {team.contactEmail}
      </div>
      <button className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-primary dark:group-hover:bg-blue-500 group-hover:text-white transition-all shrink-0">
        <ArrowRight size={18} />
      </button>
    </div>
  </motion.div>
));

RegisteredTeamItem.displayName = "RegisteredTeamItem";

export const TeamRegistrationBoard = memo(function TeamRegistrationBoard({ activeSemester }: { activeSemester: SemesterOption }) {
  const [teams, setTeams] = useState<RegisteredTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTeams = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTeamRegistrations(activeSemester.key);
      const mappedData: RegisteredTeam[] = data.map((item: any) => ({
        id: item.id,
        teamName: item.team_name,
        productIdea: item.project_item,
        leaderName: item.leader?.full_name || "알 수 없음",
        members: item.members || [],
        contactEmail: item.leader?.email || "N/A",
        status: item.status === 'Activities' ? 'ACTIVE' : 'COMPLETED'
      }));
      setTeams(mappedData);
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  }, [activeSemester.key]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const handleRegisterTeam = useCallback(async (newTeam: RegisteredTeam) => {
    try {
      const dbTeam = {
        team_name: newTeam.teamName,
        project_item: newTeam.productIdea,
        members: newTeam.members,
        status: 'Activities',
        semester_key: activeSemester.key,
        academic_year: activeSemester.year,
        academic_term: activeSemester.term,
        course_track: activeSemester.courseTrack,
      };
      await registerTeam(dbTeam);
      await fetchTeams();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error registering team:", error);
      alert(error instanceof Error ? error.message : "팀 등록 중 오류가 발생했습니다.");
    }
  }, [activeSemester, fetchTeams]);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  if (loading && teams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-500">
        <Loader2 className="animate-spin" size={40} />
        <p className="font-bold tracking-widest uppercase text-xs">Loading Teams...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 transform-gpu">
      <TeamRegistrationModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onSubmit={handleRegisterTeam}
        activeSemester={activeSemester}
      />

      {/* Registration Button Header */}
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
          <Plus size={18} />
          팀 등록하기
        </button>
      </div>

      {/* List of Registered Teams */}
      <div className="flex flex-col gap-4 transform-gpu">
        {teams.map((team, index) => (
          <RegisteredTeamItem key={team.id} team={team} index={index} />
        ))}
        
        {teams.length === 0 && (
          <div className="text-center py-20 text-slate-400 bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
            <p className="font-bold text-sm">등록된 팀이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
});

TeamRegistrationBoard.displayName = "TeamRegistrationBoard";
