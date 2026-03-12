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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/80 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="bg-white dark:bg-slate-900 w-full max-w-6xl max-h-full h-full md:h-auto md:max-h-[90vh] flex flex-col overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_32px_120px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-slate-800 relative"
          >
            {/* Design Ornaments */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 dark:bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
            
            {/* Header - Fixed Height */}
            <div className="flex-none bg-white/50 dark:bg-slate-900/50 backdrop-blur-md px-8 py-6 md:px-12 md:py-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center z-10">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-2 h-6 bg-primary dark:bg-blue-500 rounded-full"></div>
                  <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-slate-50 tracking-tight uppercase">Team Registration</h2>
                </div>
                <p className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase opacity-70">
                  Hanyang University ERICA / SW Capstone Design
                </p>
              </div>
              <button 
                onClick={onClose} 
                className="group p-3 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 rounded-2xl transition-all hover:rotate-90 active:scale-90"
              >
                <X size={28} />
              </button>
            </div>

            {/* Main Form Area - Scrollable */}
            <div className="flex-1 overflow-y-auto px-8 py-10 md:px-12 md:py-12 custom-scrollbar focus:outline-none">
              <form id="team-registration-form" onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-16">
                
                {/* 01. Basic Information */}
                <section className="animate-slide-up [animation-delay:0.1s]">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl font-black text-slate-100 dark:text-slate-800 select-none">01</span>
                    <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-slate-50">Basic Information</h3>
                    <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-primary dark:text-blue-400 uppercase tracking-widest ml-1">Team Name <span className="text-red-500">*</span></label>
                      <input required type="text" value={teamName} onChange={e => setTeamName(e.target.value)} className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-50 focus:ring-4 focus:ring-primary/10 dark:focus:ring-blue-500/10 focus:border-primary dark:focus:border-blue-500 transition-all outline-none font-bold" placeholder="Enter your team name" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-primary dark:text-blue-400 uppercase tracking-widest ml-1">Official Contact <span className="text-red-500">*</span></label>
                      <input required type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-50 focus:ring-4 focus:ring-primary/10 dark:focus:ring-blue-500/10 focus:border-primary dark:focus:border-blue-500 transition-all outline-none font-bold" placeholder="contact@hanyang.ac.kr" />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <label className="text-[11px] font-black text-primary dark:text-blue-400 uppercase tracking-widest ml-1">Project Idea / Item <span className="text-red-500">*</span></label>
                      <input required type="text" value={productIdea} onChange={e => setProductIdea(e.target.value)} className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-50 focus:ring-4 focus:ring-primary/10 dark:focus:ring-blue-500/10 focus:border-primary dark:focus:border-blue-500 transition-all outline-none font-bold" placeholder="Briefly describe your innovative project idea" />
                    </div>
                  </div>
                </section>

                {/* 02. Team Leader */}
                <section className="animate-slide-up [animation-delay:0.2s]">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl font-black text-slate-100 dark:text-slate-800 select-none">02</span>
                    <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-slate-50">Team Leader Info</h3>
                    <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-10 bg-slate-50/30 dark:bg-slate-800/20 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                      <input required type="text" value={leaderName} onChange={e => setLeaderName(e.target.value)} className="w-full px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 focus:border-primary dark:focus:border-blue-500 outline-none transition-all font-bold" placeholder="홍길동" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Student ID</label>
                      <input required type="text" value={leaderId} onChange={e => setLeaderId(e.target.value)} className="w-full px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 focus:border-primary dark:focus:border-blue-500 outline-none transition-all font-bold" placeholder="2024000000" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Department</label>
                      <input required type="text" value={leaderDept} onChange={e => setLeaderDept(e.target.value)} className="w-full px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 focus:border-primary dark:focus:border-blue-500 outline-none transition-all font-bold" placeholder="Software Architecture" />
                    </div>
                  </div>
                </section>

                {/* 03. Team Members */}
                <section className="animate-slide-up [animation-delay:0.3s]">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-black text-slate-100 dark:text-slate-800 select-none">03</span>
                      <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-slate-50">Team Members</h3>
                    </div>
                    <button type="button" onClick={handleAddMember} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-primary dark:hover:bg-blue-400 hover:text-white transition-all active:scale-95 shadow-lg">
                      <Plus size={16} /> Add Member
                    </button>
                  </div>
                  
                  <div className="space-y-8">
                    <AnimatePresence mode="popLayout">
                      {members.map((member, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="group relative bg-white dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:border-primary/20"
                        >
                          <div className="flex flex-col lg:flex-row gap-8 items-start">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 w-full">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Name</label>
                                <input type="text" value={member.name} onChange={e => handleMemberChange(index, "name", e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary outline-none" placeholder="Name" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Student ID</label>
                                <input type="text" value={member.studentId} onChange={e => handleMemberChange(index, "studentId", e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary outline-none" placeholder="ID" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Dept</label>
                                <input type="text" value={member.department} onChange={e => handleMemberChange(index, "department", e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary outline-none" placeholder="Dept" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Role</label>
                                <input type="text" value={member.role} onChange={e => handleMemberChange(index, "role", e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary outline-none" placeholder="Role" />
                              </div>
                            </div>
                            <div className="flex flex-row lg:flex-col gap-4 w-full lg:w-auto items-end justify-between lg:justify-start">
                              <div className="space-y-2 w-full">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Email</label>
                                <input type="email" value={member.email} onChange={e => handleMemberChange(index, "email", e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-primary outline-none lg:min-w-[240px]" placeholder="Email address" />
                              </div>
                              <button 
                                type="button" 
                                onClick={() => handleRemoveMember(index)} 
                                className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all shrink-0" 
                                title="Remove Member"
                              >
                                <Trash2 size={24} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </section>
              </form>
            </div>

            {/* Footer - Fixed Height */}
            <div className="flex-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-8 py-6 md:px-12 md:py-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-end items-center gap-4 z-10">
              <button 
                type="button" 
                onClick={onClose} 
                className="w-full sm:w-auto px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                Discard Changes
              </button>
              <button 
                form="team-registration-form"
                type="submit" 
                className="w-full sm:w-auto px-12 py-5 rounded-2xl font-black text-[12px] uppercase tracking-[0.25em] bg-primary dark:bg-blue-500 text-white hover:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-900 shadow-[0_12px_40px_rgba(26,54,93,0.3)] hover:shadow-none transition-all hover:-translate-y-1 active:scale-95"
              >
                Register Team Info
              </button>
            </div>

            {/* Custom Scrollbar CSS */}
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
}
