"use client";

import { ReactNode, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/common/Button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="relative bg-background border-2 border-foreground w-full max-w-2xl animate-in zoom-in-95 duration-200">
                <div className="p-10 border-b border-border flex items-center justify-between">
                    <h2 className="text-[28px] font-black tracking-tighter uppercase">{title}</h2>
                    <button onClick={onClose} className="text-muted hover:text-foreground transition-colors">
                        <X size={32} />
                    </button>
                </div>
                <div className="p-10">
                    {children}
                </div>
            </div>
        </div>
    );
}

interface ImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImportSuccess: () => void;
}

export function ImportModal({ isOpen, onClose, onImportSuccess }: ImportModalProps) {
    const projects = [
        { id: "p1", title: "Eco Connect (Business Plan)", date: "2024.03.05" },
        { id: "p2", title: "Smart Campus Idea", date: "2024.02.20" },
    ];

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Import Course 01 Data">
            <div className="space-y-8">
                <p className="text-[16px] text-muted font-medium mb-8">
                    가져올 프로젝트를 선택하세요. 과목 1의 사업계획서와 핵심 IR 키워드가 현재 대시보드와 동기화됩니다.
                </p>

                <div className="space-y-4">
                    {projects.map((p) => (
                        <div
                            key={p.id}
                            className="group p-8 border border-border hover:border-foreground cursor-pointer transition-all flex items-center justify-between"
                            onClick={() => onImportSuccess()}
                        >
                            <div>
                                <h4 className="text-[18px] font-black uppercase tracking-tighter mb-1 group-hover:text-primary transition-colors">{p.title}</h4>
                                <p className="text-xs text-muted font-bold uppercase tracking-widest">Last Modified: {p.date}</p>
                            </div>
                            <ArrowRight size={24} className="text-muted group-hover:text-foreground group-hover:translate-x-2 transition-all" />
                        </div>
                    ))}
                </div>

                <div className="pt-8 flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                </div>
            </div>
        </Modal>
    );
}
