import { useState } from "react";
import { X, Plus, Trash2, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RegisteredTeam } from "@/types";

interface TeamRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newTeam: RegisteredTeam) => void;
}

export function TeamRegistrationModal({ isOpen, onClose, onSubmit }: TeamRegistrationModalProps) {
  const [teamName, setTeamName] = useState("");
  const [productIdea, setProductIdea] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  
  // Leader info
  const [leaderName, setLeaderName] = useState("");
  const [leaderId, setLeaderId] = useState("");
  const [leaderDept, setLeaderDept] = useState("");

  // Members info
  const [members, setMembers] = useState([{ name: "", studentId: "", department: "", role: "", email: "" }]);

  if (!isOpen) return null;

  const handleAddMember = () => {
    setMembers([...members, { name: "", studentId: "", department: "", role: "", email: "" }]);
  };

  const handleRemoveMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleMemberChange = (index: number, field: keyof typeof members[0], value: string) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new team object
    const newTeam: RegisteredTeam = {
      id: `rt_${Date.now()}`,
      teamName,
      productIdea,
      leaderName,
      contactEmail,
      status: 'ACTIVE',
      members: [
        { role: '팀장', name: `${leaderName} (${leaderDept})` },
        ...members.filter(m => m.name.trim() !== "").map(m => ({
          role: m.role || '팀원',
          name: `${m.name} (${m.department})`
        }))
      ]
    };

    onSubmit(newTeam);
    
    // Reset form
    setTeamName("");
    setProductIdea("");
    setContactEmail("");
    setLeaderName("");
    setLeaderId("");
    setLeaderDept("");
    setMembers([{ name: "", studentId: "", department: "", role: "", email: "" }]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-slate-900 w-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-slate-800"
          >
            {/* Header */}
            <div className="sticky top-0 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl px-10 py-7 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight">팀 등록하기</h2>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">프로젝트를 함께할 팀 정보를 입력해주세요.</p>
              </div>
              <button 
                onClick={onClose} 
                className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 rounded-full transition-all hover:scale-110 active:scale-95"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
              <form id="team-registration-form" onSubmit={handleSubmit} className="space-y-12 pb-6">
                {/* Basic Info */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-blue-500/10 flex items-center justify-center text-primary dark:text-blue-400">
                      <Plus size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">기본 정보</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50/50 dark:bg-slate-800/20 p-8 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">팀명 <span className="text-red-500">*</span></label>
                      <input required type="text" value={teamName} onChange={e => setTeamName(e.target.value)} className="w-full px-5 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary dark:focus:ring-blue-500 transition-all outline-none shadow-sm" placeholder="팀 이름을 입력하세요" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">대표 연락처 (이메일) <span className="text-red-500">*</span></label>
                      <input required type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} className="w-full px-5 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary dark:focus:ring-blue-500 transition-all outline-none shadow-sm" placeholder="contact@team.com" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">프로젝트 아이템 <span className="text-red-500">*</span></label>
                      <input required type="text" value={productIdea} onChange={e => setProductIdea(e.target.value)} className="w-full px-5 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary dark:focus:ring-blue-500 transition-all outline-none shadow-sm" placeholder="어떤 문제를 해결하는 어떤 서비스인가요?" />
                    </div>
                  </div>
                </section>

                {/* Leader Info */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                      <Users size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">팀장 정보</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 bg-slate-50/50 dark:bg-slate-800/20 p-8 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">이름 <span className="text-red-500">*</span></label>
                      <input required type="text" value={leaderName} onChange={e => setLeaderName(e.target.value)} className="w-full px-5 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm" placeholder="홍길동" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">학번 <span className="text-red-500">*</span></label>
                      <input required type="text" value={leaderId} onChange={e => setLeaderId(e.target.value)} className="w-full px-5 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm" placeholder="2024000000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">학과 <span className="text-red-500">*</span></label>
                      <input required type="text" value={leaderDept} onChange={e => setLeaderDept(e.target.value)} className="w-full px-5 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm" placeholder="소프트웨어학부" />
                    </div>
                  </div>
                </section>

                {/* Members Info */}
                <section className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <Plus size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">팀원 정보</h3>
                    </div>
                    <button type="button" onClick={handleAddMember} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-bold hover:bg-emerald-500/20 transition-all active:scale-95">
                      <Plus size={16} /> 팀원 추가
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {members.map((member, index) => (
                      <div key={index} className="group relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-11 gap-6 bg-slate-50/30 dark:bg-slate-800/10 p-8 rounded-3xl border border-slate-100 dark:border-slate-800/80 transition-all hover:bg-white dark:hover:bg-slate-800/30 hover:shadow-xl hover:border-emerald-500/20">
                        <div className="space-y-2 lg:col-span-2">
                          <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter">이름</label>
                          <input type="text" value={member.name} onChange={e => handleMemberChange(index, "name", e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-emerald-500 transition-all outline-none" placeholder="이름" />
                        </div>
                        <div className="space-y-2 lg:col-span-2">
                          <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter">학번</label>
                          <input type="text" value={member.studentId} onChange={e => handleMemberChange(index, "studentId", e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-emerald-500 transition-all outline-none" placeholder="학번" />
                        </div>
                        <div className="space-y-2 lg:col-span-2">
                          <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter">학과</label>
                          <input type="text" value={member.department} onChange={e => handleMemberChange(index, "department", e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-emerald-500 transition-all outline-none" placeholder="학과" />
                        </div>
                        <div className="space-y-2 lg:col-span-2">
                          <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter">역할</label>
                          <input type="text" value={member.role} onChange={e => handleMemberChange(index, "role", e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-emerald-500 transition-all outline-none" placeholder="프론트엔드" />
                        </div>
                        <div className="space-y-2 lg:col-span-2">
                          <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter">이메일</label>
                          <input type="email" value={member.email} onChange={e => handleMemberChange(index, "email", e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-emerald-500 transition-all outline-none" placeholder="이메일" />
                        </div>
                        <div className="lg:col-span-1 flex items-end pb-1 lg:justify-center">
                          <button 
                            type="button" 
                            onClick={() => handleRemoveMember(index)} 
                            className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all" 
                            title="팀원 삭제"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </form>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-10 py-6 border-t border-slate-100 dark:border-slate-800 flex justify-end items-center gap-4">
              <button 
                type="button" 
                onClick={onClose} 
                className="px-8 py-4 rounded-2xl font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                취소하기
              </button>
              <button 
                form="team-registration-form"
                type="submit" 
                className="px-10 py-4 rounded-2xl font-black bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-primary dark:hover:bg-blue-400 hover:text-white shadow-xl hover:shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95"
              >
                등록 완료하기
              </button>
            </div>

            {/* Custom Scrollbar CSS */}
            <style jsx global>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(100, 116, 139, 0.2);
                border-radius: 10px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(100, 116, 139, 0.4);
              }
            `}</style>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
