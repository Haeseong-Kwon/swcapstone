"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Loader2, MessageSquare, Send, X } from "lucide-react";
import { PostComment, TeamBuildingPost } from "@/types";
import {
  createRecruitmentPostComment,
  getRecruitmentPostComments,
} from "@/lib/services/BoardServices";

interface RecruitmentPostDetailModalProps {
  isOpen: boolean;
  post: TeamBuildingPost | null;
  onClose: () => void;
}

export function RecruitmentPostDetailModal({
  isOpen,
  post,
  onClose,
}: RecruitmentPostDetailModalProps) {
  const [mounted, setMounted] = useState(false);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "unset";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !post) return;

    const fetchComments = async () => {
      try {
        setLoading(true);
        const data = await getRecruitmentPostComments(post.id);
        const mappedComments: PostComment[] = data.map((item: any) => ({
          id: item.id,
          postId: item.post_id,
          authorId: item.author_id,
          authorName: item.author?.full_name || "알 수 없음",
          content: item.content,
          createdAt: item.created_at,
        }));
        setComments(mappedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [isOpen, post]);

  const roleSummary = useMemo(
    () =>
      post?.recruitingRoles?.map((role) => `${role.role} ${role.current}/${role.total}`) ?? [],
    [post]
  );

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !commentInput.trim()) return;

    try {
      setSubmitting(true);
      const createdComment = await createRecruitmentPostComment({
        postId: post.id,
        postAuthorId: post.authorId,
        postTitle: post.title,
        content: commentInput,
      });

      if (createdComment) {
        const mappedComment: PostComment = {
          id: createdComment.id,
          postId: createdComment.post_id,
          authorId: createdComment.author_id,
          authorName: createdComment.author?.full_name || "알 수 없음",
          content: createdComment.content,
          createdAt: createdComment.created_at,
        };

        setComments((current) => [...current, mappedComment]);
        setCommentInput("");
        window.dispatchEvent(new CustomEvent("notifications:refresh"));
      }
    } catch (error: any) {
      console.error("Error creating comment:", error);
      alert(error?.message || "댓글 등록 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted || !isOpen || !post) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-950/75" onClick={onClose} />

      <div className="relative z-10 flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5 dark:border-slate-800 sm:px-8">
          <div className="pr-6">
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.24em] text-primary dark:text-blue-400">
              Community Post
            </p>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
              {post.title}
            </h2>
            <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
              {post.authorName} · {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl bg-slate-100 p-3 text-slate-500 transition-colors hover:text-slate-900 dark:bg-slate-800 dark:hover:text-slate-50"
          >
            <X size={22} />
          </button>
        </div>

        <div className="grid flex-1 gap-0 overflow-hidden lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
          <section className="overflow-y-auto border-b border-slate-100 px-6 py-6 dark:border-slate-800 lg:border-b-0 lg:border-r sm:px-8">
            <div className="space-y-8">
              <div>
                <p className="mb-3 text-[11px] font-black uppercase tracking-[0.24em] text-slate-400">
                  Summary
                </p>
                <p className="whitespace-pre-wrap text-[15px] leading-8 text-slate-700 dark:text-slate-300">
                  {post.content}
                </p>
              </div>

              <div>
                <p className="mb-3 text-[11px] font-black uppercase tracking-[0.24em] text-slate-400">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.length > 0 ? (
                    post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-black uppercase tracking-widest text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-400">등록된 기술 태그가 없습니다.</span>
                  )}
                </div>
              </div>

              <div>
                <p className="mb-3 text-[11px] font-black uppercase tracking-[0.24em] text-slate-400">
                  Recruiting Roles
                </p>
                <div className="flex flex-wrap gap-3">
                  {roleSummary.length > 0 ? (
                    roleSummary.map((role) => (
                      <span
                        key={role}
                        className="rounded-2xl bg-slate-900 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-white dark:bg-white dark:text-slate-900"
                      >
                        {role}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-400">모집 포지션 정보가 없습니다.</span>
                  )}
                </div>
              </div>
            </div>
          </section>

          <aside className="flex min-h-0 flex-col bg-slate-50/80 dark:bg-slate-950/40">
            <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-5 dark:border-slate-800 sm:px-8">
              <MessageSquare className="text-primary dark:text-blue-400" size={18} />
              <div>
                <p className="text-sm font-black text-slate-900 dark:text-slate-50">댓글</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  게시글 작성자에게 알림이 전달됩니다.
                </p>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5 sm:px-8">
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <Loader2 className="animate-spin text-primary dark:text-blue-400" size={28} />
                </div>
              ) : comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <article
                      key={comment.id}
                      className="rounded-[1.5rem] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                    >
                      <div className="mb-2 flex items-center justify-between gap-4">
                        <p className="text-sm font-black text-slate-900 dark:text-slate-50">
                          {comment.authorName}
                        </p>
                        <p className="text-[11px] font-semibold text-slate-400">
                          {new Date(comment.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {comment.content}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center text-center text-sm font-semibold text-slate-400">
                  아직 댓글이 없습니다. 첫 댓글을 남겨보세요.
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmitComment}
              className="border-t border-slate-200 bg-white px-6 py-5 dark:border-slate-800 dark:bg-slate-900 sm:px-8"
            >
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
                <textarea
                  rows={4}
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="댓글을 입력하세요"
                  className="w-full resize-none bg-transparent px-2 py-1 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-50"
                />
                <div className="mt-3 flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting || !commentInput.trim()}
                    className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500"
                  >
                    {submitting ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                    댓글 등록
                  </button>
                </div>
              </div>
            </form>
          </aside>
        </div>
      </div>
    </div>,
    document.body
  );
}
