import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Plus, Trash2, Rocket, Users, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TeamBuildingPost } from "@/types";

interface RecruitmentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newPost: TeamBuildingPost) => void;
}

export function RecruitmentUploadModal({ isOpen, onClose, onSubmit }: RecruitmentUploadModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [projectPhase, setProjectPhase] = useState<'IDEA' | 'MVP' | 'SCALE'>('IDEA');
  const [courseBadge, setCourseBadge] = useState<'CAPSTONE_1' | 'CAPSTONE_2'>('CAPSTONE_1');
  
  const [recruitingRoles, setRecruitingRoles] = useState<{ role: string; current: number; total: number }[]>([{ role: "", current: 0, total: 1 }]);
  const [techStacks, setTechStacks] = useState<string[]>([]);
  const [stackInput, setStackInput] = useState("");
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const handleAddRole = () => {
    setRecruitingRoles([...recruitingRoles, { role: "", current: 0, total: 1 }]);
  };

  const handleRemoveRole = (index: number) => {
    setRecruitingRoles(recruitingRoles.filter((_, i) => i !== index));
  };

  const handleRoleChange = (index: number, field: keyof typeof recruitingRoles[0], value: string | number) => {
    const newRoles = [...recruitingRoles];
    (newRoles[index] as any)[field] = value;
    setRecruitingRoles(newRoles);
  };

  const handleAddStack = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && stackInput.trim()) {
      e.preventDefault();
      if (!techStacks.includes(stackInput.trim())) {
        setTechStacks([...techStacks, stackInput.trim()]);
      }
      setStackInput("");
    }
  };

  const removeStack = (stack: string) => {
    setTechStacks(techStacks.filter((s) => s !== stack));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPost: TeamBuildingPost = {
      id: `post_${Date.now()}`,
      title,
      content,
      authorId: "current_user", // Placeholder
      authorName: "김철수", // Placeholder
      tags: techStacks,
      projectPhase,
      recruitingRoles,
      courseBadge,
      createdAt: new Date().toLocaleDateString('ko-KR'),
    };

    onSubmit(newPost);
    
    // Reset form
    setTitle("");
    setContent("");
    setProjectPhase('IDEA');
    setCourseBadge('CAPSTONE_1');
    setRecruitingRoles([{ role: "", current: 0, total: 1 }]);
    setTechStacks([]);
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/80 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="bg-white dark:bg-slate-900 w-full max-w-6xl max-h-full h-full md:h-auto md:max-h-[90vh] flex flex-col overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_32px_120px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-slate-800 relative"
          >
            {/* 디자인 장식 */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 dark:bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
            
            {/* 헤더 */}
            <div className="flex-none bg-white/50 dark:bg-slate-900/50 backdrop-blur-md px-8 py-6 md:px-12 md:py-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center z-10">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-2 h-6 bg-primary dark:bg-blue-500 rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight uppercase">팀원 모집글 올리기</h2>
                </div>
                <p className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase opacity-70">
                  Dashboard / Team Recruitment
                </p>
              </div>
              <button 
                onClick={onClose} 
                className="group p-3 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 rounded-2xl transition-all hover:rotate-90 active:scale-90"
              >
                <X size={24} />
              </button>
            </div>

            {/* 메인 폼 영역 - 스크롤 가능 */}
            <div className="flex-1 overflow-y-auto px-8 py-10 md:px-12 md:py-12 custom-scrollbar focus:outline-none">
              <form id="recruitment-upload-form" onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-16">
                
                {/* 01. 프로젝트 개요 */}
                <section className="animate-slide-up [animation-delay:0.1s]">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl font-black text-slate-100 dark:text-slate-800 select-none">01</span>
                    <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-slate-50">프로젝트 개요</h3>
                    <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3 md:col-span-2">
                      <label className="text-[11px] font-black text-primary dark:text-blue-400 uppercase tracking-widest ml-1">공고 제목 <span className="text-red-500">*</span></label>
                      <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-50 focus:ring-4 focus:ring-primary/10 dark:focus:ring-blue-500/10 focus:border-primary dark:focus:border-blue-500 transition-all outline-none font-bold" placeholder="함께 세상을 바꿀 팀원을 찾습니다" />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <label className="text-[11px] font-black text-primary dark:text-blue-400 uppercase tracking-widest ml-1">상세 설명 <span className="text-red-500">*</span></label>
                      <textarea required rows={5} value={content} onChange={e => setContent(e.target.value)} className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-50 focus:ring-4 focus:ring-primary/10 dark:focus:ring-blue-500/10 focus:border-primary dark:focus:border-blue-500 transition-all outline-none font-bold resize-none" placeholder="아이디어나 현재 진행 상황, 찾는 팀원상 등을 적어주세요" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-primary dark:text-blue-400 uppercase tracking-widest ml-1">과목 구분</label>
                      <div className="flex gap-4">
                        <button type="button" onClick={() => setCourseBadge("CAPSTONE_1")} className={`flex-1 py-4 rounded-xl font-bold text-sm transition-all ${courseBadge === "CAPSTONE_1" ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>캡스톤 1</button>
                        <button type="button" onClick={() => setCourseBadge("CAPSTONE_2")} className={`flex-1 py-4 rounded-xl font-bold text-sm transition-all ${courseBadge === "CAPSTONE_2" ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>캡스톤 2</button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-primary dark:text-blue-400 uppercase tracking-widest ml-1">진행 단계</label>
                      <div className="flex gap-4">
                        {(['IDEA', 'MVP', 'SCALE'] as const).map((phase) => (
                          <button key={phase} type="button" onClick={() => setProjectPhase(phase)} className={`flex-1 py-4 rounded-xl font-bold text-[11px] transition-all ${projectPhase === phase ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>{phase}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* 02. 모집 포지션 */}
                <section className="animate-slide-up [animation-delay:0.2s]">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-black text-slate-100 dark:text-slate-800 select-none">02</span>
                      <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-slate-50">모집 포지션</h3>
                    </div>
                    <button type="button" onClick={handleAddRole} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-primary dark:hover:bg-blue-400 hover:text-white transition-all active:scale-95 shadow-lg">
                      <Plus size={16} /> 포지션 추가
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <AnimatePresence mode="popLayout">
                      {recruitingRoles.map((role, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="group relative bg-slate-50/50 dark:bg-slate-800/20 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 transition-all hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:border-primary/20"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-6 gap-6 items-end">
                            <div className="sm:col-span-3 space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">역할 (예: 프론트엔드, 기획자)</label>
                              <input required type="text" value={role.role} onChange={e => handleRoleChange(index, "role", e.target.value)} className="w-full px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary outline-none" placeholder="역할 입력" />
                            </div>
                            <div className="sm:col-span-1 space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">현재 인원</label>
                              <input type="number" min="0" value={role.current} onChange={e => handleRoleChange(index, "current", parseInt(e.target.value))} className="w-full px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary outline-none" />
                            </div>
                            <div className="sm:col-span-1 space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">전체 인원</label>
                              <input type="number" min="1" value={role.total} onChange={e => handleRoleChange(index, "total", parseInt(e.target.value))} className="w-full px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary outline-none" />
                            </div>
                            <div className="sm:col-span-1 flex justify-center pb-1">
                              <button type="button" onClick={() => handleRemoveRole(index)} className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all">
                                <Trash2 size={24} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </section>

                {/* 03. 원하늘 기술 스택 */}
                <section className="animate-slide-up [animation-delay:0.3s]">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl font-black text-slate-100 dark:text-slate-800 select-none">03</span>
                    <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-slate-50">필요 기술 스택</h3>
                    <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">기술 태그 (Enter를 눌러 추가)</label>
                      <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                        <div className="flex flex-wrap gap-2 mb-4">
                          <AnimatePresence>
                            {techStacks.map((stack) => (
                              <motion.span 
                                key={stack}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-[11px] font-black text-primary dark:text-blue-400 uppercase tracking-widest shadow-sm"
                              >
                                {stack}
                                <button type="button" onClick={() => removeStack(stack)} className="text-slate-400 hover:text-red-500 transition-colors">
                                  <X size={14} />
                                </button>
                              </motion.span>
                            ))}
                          </AnimatePresence>
                        </div>
                        <input 
                          type="text" 
                          value={stackInput} 
                          onChange={e => setStackInput(e.target.value)} 
                          onKeyDown={handleAddStack}
                          className="w-full bg-transparent border-none outline-none font-bold text-sm text-slate-900 dark:text-slate-50" 
                          placeholder="태그를 입력하세요 (예: Next.js, Figma, AI...)" 
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </form>
            </div>

            {/* 푸터 */}
            <div className="flex-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-8 py-6 md:px-12 md:py-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-end items-center gap-4 z-10">
              <button 
                type="button" 
                onClick={onClose} 
                className="w-full sm:w-auto px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                취소하기
              </button>
              <button 
                form="recruitment-upload-form"
                type="submit" 
                className="w-full sm:w-auto px-12 py-5 rounded-2xl font-black text-[12px] uppercase tracking-[0.25em] bg-primary dark:bg-blue-500 text-white hover:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-900 shadow-[0_12px_40px_rgba(26,54,93,0.3)] hover:shadow-none transition-all hover:-translate-y-1 active:scale-95"
              >
                공고 올리기
              </button>
            </div>

            <style jsx global>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 8px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(100, 116, 139, 0.1);
                border-radius: 20px;
                border: 2px solid transparent;
                background-clip: content-box;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(100, 116, 139, 0.3);
                background-clip: content-box;
              }
            `}</style>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
