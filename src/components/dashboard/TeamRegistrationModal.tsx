import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Plus, Trash2 } from "lucide-react";
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
  const [leaderName, setLeaderName] = useState("");
  const [leaderId, setLeaderId] = useState("");
  const [leaderDept, setLeaderDept] = useState("");
  const [members, setMembers] = useState([{ name: "", studentId: "", department: "", role: "", email: "" }]);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const t = setTimeout(() => { document.body.style.overflow = 'unset'; }, 200);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!mounted) return null;

  const handleAddMember = () => setMembers([...members, { name: "", studentId: "", department: "", role: "", email: "" }]);
  const handleRemoveMember = (index: number) => setMembers(members.filter((_, i) => i !== index));
  const handleMemberChange = (index: number, field: keyof typeof members[0], value: string) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTeam: RegisteredTeam = {
      id: `rt_${Date.now()}`,
      teamName, productIdea, leaderName, contactEmail,
      status: 'ACTIVE',
      members: [
        { role: '팀장', name: `${leaderName} (${leaderDept})` },
        ...members.filter(m => m.name.trim() !== "").map(m => ({ role: m.role || '팀원', name: `${m.name} (${m.department})` }))
      ]
    };
    onSubmit(newTeam);
    setTeamName(""); setProductIdea(""); setContactEmail(""); setLeaderName(""); setLeaderId(""); setLeaderDept("");
    setMembers([{ name: "", studentId: "", department: "", role: "", email: "" }]);
  };

  const overlayStyle: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transition: 'opacity 0.2s ease',
  };
  const panelStyle: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)',
    transition: 'opacity 0.2s ease, transform 0.2s ease',
    willChange: 'transform, opacity',
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="absolute inset-0 bg-slate-950/70" style={overlayStyle} onClick={onClose} />

      <div
        className="relative bg-white dark:bg-slate-900 w-full max-w-6xl max-h-full h-full md:h-auto md:max-h-[90vh] flex flex-col overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl"
        style={panelStyle}
      >
        {/* 헤더 */}
        <div className="flex-none bg-white dark:bg-slate-900 px-8 py-6 md:px-12 md:py-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-2 h-6 bg-primary dark:bg-blue-500 rounded-full"></div>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-slate-50 tracking-tight uppercase">팀 등록하기</h2>
            </div>
            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase">Hanyang University ERICA / SW Capstone Design</p>
          </div>
          <button onClick={onClose} className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 rounded-2xl" style={{ transition: 'color 0.15s, background-color 0.15s' }}>
            <X size={28} />
          </button>
        </div>

        {/* 메인 폼 영역 */}
        <div className="flex-1 overflow-y-auto px-8 py-10 md:px-12 md:py-12" style={{ overscrollBehavior: 'contain' }}>
          <form id="team-registration-form" onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-16">

            {/* 01. 기본 정보 */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-black text-slate-100 dark:text-slate-800 select-none">01</span>
                <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-slate-50">기본 정보</h3>
                <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-primary dark:text-blue-400 uppercase tracking-widest ml-1">팀명 <span className="text-red-500">*</span></label>
                  <input required type="text" value={teamName} onChange={e => setTeamName(e.target.value)} className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-50 outline-none font-bold" style={{ transition: 'border-color 0.15s' }} placeholder="팀 이름을 입력하세요" />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-primary dark:text-blue-400 uppercase tracking-widest ml-1">대표 연락처 (이메일) <span className="text-red-500">*</span></label>
                  <input required type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-50 outline-none font-bold" style={{ transition: 'border-color 0.15s' }} placeholder="contact@hanyang.ac.kr" />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <label className="text-[11px] font-black text-primary dark:text-blue-400 uppercase tracking-widest ml-1">프로젝트 아이템 (아이디어) <span className="text-red-500">*</span></label>
                  <input required type="text" value={productIdea} onChange={e => setProductIdea(e.target.value)} className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-50 outline-none font-bold" style={{ transition: 'border-color 0.15s' }} placeholder="해결하고자 하는 문제와 핵심 솔루션을 입력하세요" />
                </div>
              </div>
            </section>

            {/* 02. 팀장 정보 */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-black text-slate-100 dark:text-slate-800 select-none">02</span>
                <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-slate-50">팀장 정보</h3>
                <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-10 bg-slate-50/30 dark:bg-slate-800/20 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">이름</label>
                  <input required type="text" value={leaderName} onChange={e => setLeaderName(e.target.value)} className="w-full px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 outline-none font-bold" style={{ transition: 'border-color 0.15s' }} placeholder="홍길동" />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">학번</label>
                  <input required type="text" value={leaderId} onChange={e => setLeaderId(e.target.value)} className="w-full px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 outline-none font-bold" style={{ transition: 'border-color 0.15s' }} placeholder="2024000000" />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">학과</label>
                  <input required type="text" value={leaderDept} onChange={e => setLeaderDept(e.target.value)} className="w-full px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 outline-none font-bold" style={{ transition: 'border-color 0.15s' }} placeholder="소프트웨어학부" />
                </div>
              </div>
            </section>

            {/* 03. 팀원 정보 */}
            <section>
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-black text-slate-100 dark:text-slate-800 select-none">03</span>
                  <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-slate-50">팀원 정보</h3>
                </div>
                <button type="button" onClick={handleAddMember} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-black uppercase tracking-[0.2em] active:scale-95" style={{ transition: 'background-color 0.15s, color 0.15s, transform 0.1s' }}>
                  <Plus size={16} /> 팀원 추가
                </button>
              </div>
              <div className="space-y-8">
                {members.map((member, index) => (
                  <div key={index} className="relative bg-white dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 w-full">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">이름</label>
                          <input type="text" value={member.name} onChange={e => handleMemberChange(index, "name", e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm font-bold text-slate-900 dark:text-slate-50 outline-none" placeholder="이름" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">학번</label>
                          <input type="text" value={member.studentId} onChange={e => handleMemberChange(index, "studentId", e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm font-bold text-slate-900 dark:text-slate-50 outline-none" placeholder="학번" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">학과</label>
                          <input type="text" value={member.department} onChange={e => handleMemberChange(index, "department", e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm font-bold text-slate-900 dark:text-slate-50 outline-none" placeholder="학과" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">역할</label>
                          <input type="text" value={member.role} onChange={e => handleMemberChange(index, "role", e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm font-bold text-slate-900 dark:text-slate-50 outline-none" placeholder="역할" />
                        </div>
                      </div>
                      <div className="flex flex-row lg:flex-col gap-4 w-full lg:w-auto items-end justify-between lg:justify-start">
                        <div className="space-y-2 w-full">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">이메일</label>
                          <input type="email" value={member.email} onChange={e => handleMemberChange(index, "email", e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm font-bold text-slate-900 dark:text-slate-50 outline-none lg:min-w-[240px]" placeholder="이메일 주소" />
                        </div>
                        <button type="button" onClick={() => handleRemoveMember(index)} className="p-3 text-slate-300 hover:text-red-500 rounded-xl shrink-0" style={{ transition: 'color 0.15s' }} title="팀원 삭제">
                          <Trash2 size={24} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </form>
        </div>

        {/* 푸터 */}
        <div className="flex-none bg-white dark:bg-slate-900 px-8 py-6 md:px-12 md:py-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-end items-center gap-4">
          <button type="button" onClick={onClose} className="w-full sm:w-auto px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" style={{ transition: 'background-color 0.15s' }}>
            취소하기
          </button>
          <button form="team-registration-form" type="submit" className="w-full sm:w-auto px-12 py-5 rounded-2xl font-black text-[12px] uppercase tracking-[0.25em] bg-primary dark:bg-blue-500 text-white hover:opacity-90 active:scale-95 shadow-lg" style={{ transition: 'opacity 0.15s, transform 0.1s' }}>
            등록 신청하기
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
