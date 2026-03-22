import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Github, Globe } from "lucide-react";
import { User } from "@/types";

interface ProfileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newUser: User) => void;
}

export function ProfileUploadModal({ isOpen, onClose, onSubmit }: ProfileUploadModalProps) {
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [status, setStatus] = useState<"LOOKING" | "COMPLETED">("LOOKING");
  const [techStacks, setTechStacks] = useState<string[]>([]);
  const [stackInput, setStackInput] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const t = setTimeout(() => {
        document.body.style.overflow = "unset";
        setIsRendered(false);
      }, 220);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!mounted || !isRendered) return null;


  const handleAddStack = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && stackInput.trim()) {
      e.preventDefault();
      if (!techStacks.includes(stackInput.trim())) setTechStacks([...techStacks, stackInput.trim()]);
      setStackInput("");
    }
  };
  const removeStack = (stack: string) => setTechStacks(techStacks.filter(s => s !== stack));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = { id: `user_${Date.now()}`, name, email: "", role: "STUDENT", major, specialty, status, techStack: techStacks, githubUrl, blogUrl };
    onSubmit(newUser);
    setName(""); setMajor(""); setSpecialty(""); setStatus("LOOKING"); setTechStacks([]); setGithubUrl(""); setBlogUrl("");
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
        className="relative bg-white dark:bg-slate-900 w-full max-w-5xl max-h-full h-full md:h-auto md:max-h-[85vh] flex flex-col overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl"
        style={panelStyle}
      >
        {/* 헤더 */}
        <div className="flex-none bg-white dark:bg-slate-900 px-8 py-6 md:px-12 md:py-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-2 h-6 bg-primary dark:bg-blue-500 rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight uppercase">자기소개 업로드</h2>
            </div>
            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase">Dashboard / Profile Introduction</p>
          </div>
          <button onClick={onClose} className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 rounded-2xl" style={{ transition: 'color 0.15s, background-color 0.15s' }}>
            <X size={24} />
          </button>
        </div>

        {/* 메인 폼 영역 */}
        <div className="flex-1 overflow-y-auto px-8 py-10 md:px-12 md:py-12" style={{ overscrollBehavior: 'contain' }}>
          <form id="profile-upload-form" onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-12">

            {/* 01. 기본 프로필 */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl font-black text-slate-100 dark:text-slate-800 select-none">01</span>
                <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-slate-50">기본 프로필</h3>
                <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-primary dark:text-blue-400 uppercase tracking-widest ml-1">이름 <span className="text-red-500">*</span></label>
                  <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 outline-none font-bold" style={{ transition: 'border-color 0.15s' }} placeholder="성함을 입력하세요" />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-primary dark:text-blue-400 uppercase tracking-widest ml-1">전공/학과 <span className="text-red-500">*</span></label>
                  <input required type="text" value={major} onChange={e => setMajor(e.target.value)} className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 outline-none font-bold" style={{ transition: 'border-color 0.15s' }} placeholder="소프트웨어전공" />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-primary dark:text-blue-400 uppercase tracking-widest ml-1">전문 분야 / 역할 <span className="text-red-500">*</span></label>
                  <input required type="text" value={specialty} onChange={e => setSpecialty(e.target.value)} className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 outline-none font-bold" style={{ transition: 'border-color 0.15s' }} placeholder="Full-stack Developer" />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-primary dark:text-blue-400 uppercase tracking-widest ml-1">현재 상태</label>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStatus("LOOKING")} className={`flex-1 py-4 rounded-xl font-bold text-sm ${status === "LOOKING" ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`} style={{ transition: 'background-color 0.15s, color 0.15s' }}>팀 찾는 중</button>
                    <button type="button" onClick={() => setStatus("COMPLETED")} className={`flex-1 py-4 rounded-xl font-bold text-sm ${status === "COMPLETED" ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`} style={{ transition: 'background-color 0.15s, color 0.15s' }}>구성 완료</button>
                  </div>
                </div>
              </div>
            </section>

            {/* 02. 역량 및 기술 스택 */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl font-black text-slate-100 dark:text-slate-800 select-none">02</span>
                <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-slate-50">역량 및 기술 스택</h3>
                <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl">
                <div className="flex flex-wrap gap-2 mb-3">
                  {techStacks.map(stack => (
                    <span key={stack} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-black text-primary dark:text-blue-400 uppercase tracking-widest">
                      {stack}
                      <button type="button" onClick={() => removeStack(stack)} className="text-slate-400 hover:text-red-500" style={{ transition: 'color 0.15s' }}><X size={14} /></button>
                    </span>
                  ))}
                </div>
                <input type="text" value={stackInput} onChange={e => setStackInput(e.target.value)} onKeyDown={handleAddStack} className="w-full bg-transparent border-none outline-none font-bold text-sm text-slate-900 dark:text-slate-50" placeholder="React, TypeScript, Node.js..." />
              </div>
            </section>

            {/* 03. 관련 링크 */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl font-black text-slate-100 dark:text-slate-800 select-none">03</span>
                <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-slate-50">관련 링크</h3>
                <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">GitHub URL</label>
                  <div className="relative">
                    <Github className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="url" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 outline-none font-bold text-sm" placeholder="https://github.com/your-id" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Portfolio / Blog URL</label>
                  <div className="relative">
                    <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="url" value={blogUrl} onChange={e => setBlogUrl(e.target.value)} className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 outline-none font-bold text-sm" placeholder="https://your-site.com" />
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* 푸터 */}
        <div className="flex-none bg-white dark:bg-slate-900 px-8 py-6 md:px-12 md:py-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-end items-center gap-4">
          <button type="button" onClick={onClose} className="w-full sm:w-auto px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" style={{ transition: 'background-color 0.15s' }}>
            취소하기
          </button>
          <button form="profile-upload-form" type="submit" className="w-full sm:w-auto px-12 py-5 rounded-2xl font-black text-[12px] uppercase tracking-[0.25em] bg-primary dark:bg-blue-500 text-white hover:opacity-90 active:scale-95 shadow-lg" style={{ transition: 'opacity 0.15s, transform 0.1s' }}>
            소개글 게시하기
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
