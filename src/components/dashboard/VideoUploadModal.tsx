"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { VideoContent } from "@/types";

interface VideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (video: VideoContent) => void;
}

export function VideoUploadModal({ isOpen, onClose, onSubmit }: VideoUploadModalProps) {
  const [mounted, setMounted] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [instructor, setInstructor] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");

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
      id: `video_${Date.now()}`,
      title,
      description,
      videoUrl,
      thumbnailUrl,
      instructor,
      duration,
      category,
      createdAt: new Date().toISOString(),
      viewCount: 0,
    });

    setTitle("");
    setDescription("");
    setVideoUrl("");
    setThumbnailUrl("");
    setInstructor("");
    setDuration("");
    setCategory("");
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-950/70" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6 dark:border-slate-800">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-50">교육 영상 등록</h2>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Dashboard / Educational Video</p>
          </div>
          <button onClick={onClose} className="rounded-2xl bg-slate-100 p-3 text-slate-500 dark:bg-slate-800">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 px-8 py-8">
          <div className="grid gap-6 md:grid-cols-2">
            <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="영상 제목" className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-bold outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50" />
            <input required value={category} onChange={(e) => setCategory(e.target.value)} placeholder="카테고리" className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-bold outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50" />
            <input required value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="영상 URL" className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-bold outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50" />
            <input value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} placeholder="썸네일 URL (선택)" className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-bold outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50" />
            <input required value={instructor} onChange={(e) => setInstructor(e.target.value)} placeholder="강사명" className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-bold outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50" />
            <input required value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="재생 시간 (예: 15:00)" className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-bold outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50" />
          </div>

          <textarea required rows={5} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="영상 설명" className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 font-bold outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50" />

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
