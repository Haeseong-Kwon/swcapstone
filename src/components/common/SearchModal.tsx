"use client";

import { useState, useEffect, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Search, X, Users, Briefcase, FileText, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { globalSearch, SearchResult } from "@/lib/services/SearchService";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialQuery?: string;
}

export function SearchModal({ isOpen, onClose, initialQuery = "" }: SearchModalProps) {
    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = useCallback(async (searchQuery: string) => {
        if (!searchQuery.trim()) { setResults([]); return; }
        setIsLoading(true);
        try {
            const data = await globalSearch(searchQuery);
            setResults(data);
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            setQuery(initialQuery);
            if (initialQuery) handleSearch(initialQuery);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setQuery("");
            setResults([]);
        }
    }, [isOpen, initialQuery, handleSearch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query && query !== initialQuery) handleSearch(query);
        }, 300);
        return () => clearTimeout(timer);
    }, [query, handleSearch, initialQuery]);

    const getTypeIcon = (type: string) => {
        if (type === 'post') return <Users size={18} className="text-primary" />;
        if (type === 'profile') return <FileText size={18} className="text-blue-500" />;
        return <Briefcase size={18} className="text-emerald-500" />;
    };

    const getTypeLabel = (type: string) => {
        if (type === 'post') return 'Networking';
        if (type === 'profile') return 'Community';
        return 'Corporate';
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-32 px-4 sm:px-6">
                    {/* Solid overlay — no blur */}
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50"
                    />

                    {/* Modal panel */}
                    <m.div
                        initial={{ opacity: 0, y: -12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        style={{ willChange: 'transform, opacity' }}
                        className="relative w-full max-w-2xl bg-background rounded-[2.5rem] border border-border shadow-2xl overflow-hidden"
                    >
                        <div className="p-6 sm:p-8 space-y-8">
                            <div className="flex items-center gap-4 border-b border-border pb-6">
                                <Search className="text-primary shrink-0" size={28} />
                                <input
                                    autoFocus
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="무엇이든 검색해보세요..."
                                    className="flex-1 bg-transparent text-[18px] sm:text-[22px] font-black outline-none placeholder:text-muted uppercase tracking-tight"
                                />
                                <button onClick={onClose} className="p-2 rounded-full text-muted hover:text-foreground" style={{ transition: 'color 0.15s' }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-6">
                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                                        <Loader2 className="animate-spin text-primary" size={32} />
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">Searching...</p>
                                    </div>
                                ) : results.length > 0 ? (
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Search Results ({results.length})</p>
                                        <div className="grid gap-3">
                                            {results.map((result) => (
                                                <Link
                                                    key={`${result.type}-${result.id}`}
                                                    href={result.url}
                                                    onClick={onClose}
                                                    className="group flex items-center justify-between p-5 border border-border rounded-3xl"
                                                    style={{ transition: 'border-color 0.15s, background-color 0.15s' }}
                                                >
                                                    <div className="flex items-center gap-5">
                                                        <div className="w-12 h-12 rounded-2xl bg-muted/5 flex items-center justify-center">
                                                            {getTypeIcon(result.type)}
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground px-2 py-0.5 bg-muted/10 rounded-full">{getTypeLabel(result.type)}</span>
                                                                <h4 className="text-[16px] font-bold uppercase tracking-tight">{result.title}</h4>
                                                            </div>
                                                            <p className="text-[13px] text-muted font-medium line-clamp-1">{result.description}</p>
                                                        </div>
                                                    </div>
                                                    <ChevronRight size={18} className="text-border" />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : query ? (
                                    <div className="py-20 text-center space-y-2">
                                        <p className="text-[18px] font-black uppercase tracking-tight">검색 결과가 없습니다.</p>
                                        <p className="text-sm text-muted font-medium">단어를 확인하거나 다른 검색어를 입력해보세요.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-8 py-4">
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Recommended Tags</p>
                                            <div className="flex flex-wrap gap-2">
                                                {["#AI", "#Platform", "#ESG", "#Student", "#Corporate"].map(tag => (
                                                    <button
                                                        key={tag}
                                                        onClick={() => setQuery(tag.replace('#', ''))}
                                                        className="px-5 py-2.5 bg-muted/5 border border-border rounded-full text-[13px] font-bold"
                                                        style={{ transition: 'border-color 0.15s, color 0.15s' }}
                                                    >
                                                        {tag}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="p-8 bg-primary/5 rounded-[2rem] border border-primary/10">
                                            <h5 className="text-[14px] font-black uppercase tracking-tight mb-2">AOP Smart Search</h5>
                                            <p className="text-[12px] text-muted font-medium">플랫폼 전반의 데이터를 실시간으로 인덱싱하여 최적의 결과를 제공합니다.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </m.div>
                </div>
            )}
        </AnimatePresence>
    );
}
