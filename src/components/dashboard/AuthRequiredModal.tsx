"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Lock, X } from "lucide-react";

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export function AuthRequiredModal({ isOpen, onClose, onLogin }: AuthRequiredModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-950/70" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary dark:bg-blue-500/10 dark:text-blue-400">
              <Lock size={18} />
            </div>
            <div>
              <p className="text-lg font-black text-slate-900 dark:text-slate-50">로그인이 필요합니다</p>
              <p className="text-xs font-semibold text-slate-400">업로드 기능은 로그인 사용자만 사용할 수 있습니다.</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-2xl bg-slate-100 p-3 text-slate-500 dark:bg-slate-800">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6">
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
            계속하려면 먼저 로그인하세요. 로그인 후 현재 학기 기준으로 자기소개, 팀 모집, 팀 등록, 기업제안 프로젝트, 교육 영상을 등록할 수 있습니다.
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-5 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl px-5 py-3 text-sm font-black text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            닫기
          </button>
          <button
            type="button"
            onClick={onLogin}
            className="rounded-2xl bg-primary px-5 py-3 text-sm font-black text-white dark:bg-blue-500"
          >
            로그인하기
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
