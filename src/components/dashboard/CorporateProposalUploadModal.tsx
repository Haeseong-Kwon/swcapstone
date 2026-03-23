"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Proposal } from "@/types";
import { SemesterOption } from "@/lib/semester";

interface CorporateProposalUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (proposal: Proposal) => void;
  activeSemester: SemesterOption;
}

export function CorporateProposalUploadModal({
  isOpen,
  onClose,
  onSubmit,
  activeSemester,
}: CorporateProposalUploadModalProps) {
  const [mounted, setMounted] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [category, setCategory] = useState<"CORPORATE" | "GOVERNMENT">("CORPORATE");
  const [keywordsInput, setKeywordsInput] = useState("");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: `proposal_${Date.now()}`,
      companyName,
      companyLogo: thumbnailUrl,
      title,
      description,
      deadline,
      category,
      keywords: keywordsInput
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean),
      hasMentoring: true,
      benefits: [],
      isHot: false,
    });

    setCompanyName("");
    setTitle("");
    setDescription("");
    setDeadline("");
    setThumbnailUrl("");
    setCategory("CORPORATE");
    setKeywordsInput("");
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-950/70" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6 dark:border-slate-800">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-50">기업제안 프로젝트 등록</h2>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
              {activeSemester.label} / {activeSemester.courseLabel}
            </p>
          </div>
          <button onClick={onClose} className="rounded-2xl bg-slate-100 p-3 text-slate-500 dark:bg-slate-800">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 px-8 py-8">
          <div className="grid gap-6 md:grid-cols-2">
            <input required value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="기관/기업명" className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-bold outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50" />
            <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="프로젝트 제목" className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-bold outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50" />
            <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-bold outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50" />
            <input value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} placeholder="썸네일 URL (선택)" className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-bold outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50" />
          </div>

          <div className="flex gap-3">
            {(["CORPORATE", "GOVERNMENT"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-2xl px-5 py-3 text-sm font-black ${category === item ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"}`}
              >
                {item === "CORPORATE" ? "기업" : "공공/지자체"}
              </button>
            ))}
          </div>

          <textarea required rows={5} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="프로젝트 설명" className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 font-bold outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50" />
          <input value={keywordsInput} onChange={(e) => setKeywordsInput(e.target.value)} placeholder="키워드 (쉼표로 구분)" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-bold outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50" />

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-2xl px-6 py-3 text-sm font-black text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
              취소
            </button>
            <button type="submit" className="rounded-2xl bg-primary px-6 py-3 text-sm font-black text-white dark:bg-blue-500">
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
