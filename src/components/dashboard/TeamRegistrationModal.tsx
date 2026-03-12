import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-slate-900 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800"
          >
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-8 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-50">팀 등록하기</h2>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Basic Info */}
              <section className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">기본 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400">팀명 <span className="text-red-500">*</span></label>
                    <input required type="text" value={teamName} onChange={e => setTeamName(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary outline-none" placeholder="팀 이름을 입력하세요" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400">대표 연락처 (이메일) <span className="text-red-500">*</span></label>
                    <input required type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary outline-none" placeholder="contact@team.com" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400">프로젝트 아이템 (아이디어) <span className="text-red-500">*</span></label>
                    <input required type="text" value={productIdea} onChange={e => setProductIdea(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary outline-none" placeholder="어떤 문제를 해결하는 어떤 서비스인가요?" />
                  </div>
                </div>
              </section>

              {/* Leader Info */}
              <section className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">팀장 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400">이름 <span className="text-red-500">*</span></label>
                    <input required type="text" value={leaderName} onChange={e => setLeaderName(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary outline-none" placeholder="홍길동" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400">학번 <span className="text-red-500">*</span></label>
                    <input required type="text" value={leaderId} onChange={e => setLeaderId(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary outline-none" placeholder="2024000000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400">학과 <span className="text-red-500">*</span></label>
                    <input required type="text" value={leaderDept} onChange={e => setLeaderDept(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary outline-none" placeholder="소프트웨어학부" />
                  </div>
                </div>
              </section>

              {/* Members Info */}
              <section className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">팀원 정보</h3>
                  <button type="button" onClick={handleAddMember} className="flex items-center gap-1 text-sm font-bold text-primary dark:text-blue-400 hover:opacity-80 transition-opacity">
                    <Plus size={16} /> 추가하기
                  </button>
                </div>
                
                <div className="space-y-4">
                  {members.map((member, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-slate-50/50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold text-slate-500">이름</label>
                        <input type="text" value={member.name} onChange={e => handleMemberChange(index, "name", e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-50 focus:ring-1 focus:ring-primary outline-none" placeholder="이름" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold text-slate-500">학번</label>
                        <input type="text" value={member.studentId} onChange={e => handleMemberChange(index, "studentId", e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-50 focus:ring-1 focus:ring-primary outline-none" placeholder="학번" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold text-slate-500">학과</label>
                        <input type="text" value={member.department} onChange={e => handleMemberChange(index, "department", e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-50 focus:ring-1 focus:ring-primary outline-none" placeholder="학과" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold text-slate-500">역할</label>
                        <input type="text" value={member.role} onChange={e => handleMemberChange(index, "role", e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-50 focus:ring-1 focus:ring-primary outline-none" placeholder="백엔드 등" />
                      </div>
                      <div className="space-y-2 md:col-span-3">
                        <label className="text-xs font-bold text-slate-500">이메일</label>
                        <input type="email" value={member.email} onChange={e => handleMemberChange(index, "email", e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-50 focus:ring-1 focus:ring-primary outline-none" placeholder="이메일" />
                      </div>
                      <div className="md:col-span-1 flex justify-end pb-1">
                        <button type="button" onClick={() => handleRemoveMember(index)} className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="팀원 삭제">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  취소
                </button>
                <button type="submit" className="px-8 py-3 rounded-xl font-bold text-sm bg-primary dark:bg-blue-500 text-white hover:bg-primary-dark dark:hover:bg-blue-600 shadow-md hover:shadow-lg transition-all">
                  등록 완료
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
