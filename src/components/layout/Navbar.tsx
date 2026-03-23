"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight, Search, Bell, User as UserIcon, Menu, X, Sun, Moon, Loader2, MessageSquare } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { getCurrentUser, onAuthStateChange, signOut } from "@/lib/services/AuthService";
import { getNotifications, markNotificationsAsRead } from "@/lib/services/BoardServices";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { SearchModal } from "@/components/common/SearchModal";
import { NotificationItem } from "@/types";

const NAV_ITEMS = [
    { name: "SW창업캡스톤디자인", href: "/dashboard", desc: "Project & Grade Management" },
    { name: "팀빌딩", href: "/community", desc: "Team matching & Networking" },
    { name: "지원사업", href: "/proposals", desc: "Corp/Gov Projects" },
    { name: "인사이트", href: "/insights", desc: "Startup Knowhow & Media" },
    { name: "포트폴리오", href: "/portfolio", desc: "Startup Results & Pitch" },
];

export function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isNotificationLoading, setIsNotificationLoading] = useState(false);
    const notificationRef = useRef<HTMLDivElement | null>(null);

    const unreadNotifications = notifications.filter((item) => !item.isRead);

    const fetchNotifications = useCallback(async () => {
        if (!user) {
            setNotifications([]);
            return;
        }

        try {
            setIsNotificationLoading(true);
            const data = await getNotifications();
            const mappedNotifications: NotificationItem[] = data.map((item: any) => ({
                id: item.id,
                recipientId: item.recipient_id,
                actorId: item.actor_id,
                actorName: item.actor?.full_name || "알 수 없음",
                type: item.type,
                postId: item.post_id,
                postTitle: item.post?.title || "게시글",
                content: item.content,
                isRead: item.is_read,
                createdAt: item.created_at,
            }));
            setNotifications(mappedNotifications);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setIsNotificationLoading(false);
        }
    }, [user]);

    useEffect(() => {
        getCurrentUser().then((currentUser) => {
            setUser(currentUser);
        });

        const unsubscribe = onAuthStateChange((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    useEffect(() => {
        const handleRefresh = () => {
            fetchNotifications();
        };

        window.addEventListener("notifications:refresh", handleRefresh);
        return () => window.removeEventListener("notifications:refresh", handleRefresh);
    }, [fetchNotifications]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await signOut();
            router.push("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNotificationToggle = async () => {
        const nextOpen = !isNotificationOpen;
        setIsNotificationOpen(nextOpen);

        if (!nextOpen || unreadNotifications.length === 0) return;

        try {
            const unreadIds = unreadNotifications.map((item) => item.id);
            await markNotificationsAsRead(unreadIds);
            setNotifications((current) =>
                current.map((item) =>
                    unreadIds.includes(item.id) ? { ...item, isRead: true } : item
                )
            );
        } catch (error) {
            console.error("Error marking notifications as read:", error);
        }
    };

    return (
        <>
            <nav className={cn(
                "fixed top-0 left-0 right-0 z-50 border-b premium-transition will-change-transform transform-gpu",
                isScrolled
                    ? "glass-header shadow-[0_10px_30px_rgba(15,23,42,0.10)] border-white/5"
                    : "bg-gradient-to-b from-black/72 via-black/24 to-transparent border-transparent"
            )}>
                <div className="mx-auto flex h-[78px] items-center justify-between fluid-container">
                    <div className="flex items-center gap-6 xl:gap-12">
                        <Link href="/" className="flex items-center gap-3 group">
                            <span className={cn(
                                "text-2xl sm:text-3xl font-black tracking-tighter premium-transition",
                                isScrolled ? "text-foreground" : "text-white"
                            )}>AOP</span>
                            <div className={cn(
                                "hidden sm:block w-[1px] h-6 mx-2 premium-transition",
                                isScrolled ? "bg-border" : "bg-white/20"
                            )}></div>
                            <span className={cn(
                                "hidden sm:block text-[11px] font-bold tracking-[0.3em] uppercase premium-transition",
                                isScrolled ? "text-muted-foreground" : "text-white/70"
                            )}>Entrepreneurship</span>
                        </Link>

                        <div className="hidden min-[1200px]:flex items-center gap-7 xl:gap-10">
                            {NAV_ITEMS.map((item) => {
                                const isActive = !!(pathname && item.href && pathname.startsWith(item.href));
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            "relative flex h-[78px] items-center text-[13px] xl:text-[14px] font-black uppercase tracking-[0.18em] premium-transition",
                                            isScrolled
                                                ? (isActive ? "text-primary dark:text-blue-400 border-b-4 border-primary dark:border-blue-400" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50")
                                                : (isActive ? "text-white border-b-4 border-white" : "text-white/70 hover:text-white")
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                            className={cn(
                                "p-2 rounded-full premium-transition",
                                isScrolled ? "text-muted-foreground hover:bg-muted/10 hover:text-foreground" : "text-white/80 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <div className={cn(
                            "hidden md:flex items-center gap-3 border-r pr-5 mr-2 premium-transition lg:pr-7 lg:mr-3",
                            isScrolled ? "border-border" : "border-white/20"
                        )}>
                            <button 
                                type="button"
                                onClick={() => setIsSearchOpen(true)}
                                aria-label="Search"
                                className={cn(
                                    "premium-transition hover:scale-110",
                                    isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"
                                )}
                            >
                                <Search size={22} />
                            </button>
                            <div className="relative" ref={notificationRef}>
                                <button 
                                    type="button"
                                    onClick={handleNotificationToggle}
                                    aria-label="Notifications"
                                    className={cn(
                                        "premium-transition hover:scale-110 relative",
                                        isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"
                                    )}
                                >
                                    <Bell size={22} />
                                    {unreadNotifications.length > 0 && (
                                        <>
                                            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-black text-white">
                                                {Math.min(unreadNotifications.length, 9)}
                                            </span>
                                            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
                                        </>
                                    )}
                                </button>

                                {isNotificationOpen && (
                                    <div className="absolute right-0 top-12 z-[120] w-[360px] overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                                        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
                                            <div>
                                                <p className="text-sm font-black text-slate-900 dark:text-slate-50">알림</p>
                                                <p className="text-[11px] font-semibold text-slate-400">
                                                    새 댓글이 오면 여기 표시됩니다.
                                                </p>
                                            </div>
                                            {isNotificationLoading && <Loader2 className="animate-spin text-primary" size={16} />}
                                        </div>

                                        <div className="max-h-[420px] overflow-y-auto">
                                            {notifications.length > 0 ? (
                                                notifications.map((notification) => (
                                                    <div
                                                        key={notification.id}
                                                        className={cn(
                                                            "border-b border-slate-100 px-5 py-4 last:border-b-0 dark:border-slate-800",
                                                            !notification.isRead && "bg-primary/[0.04] dark:bg-blue-500/10"
                                                        )}
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <div className="mt-1 rounded-xl bg-slate-100 p-2 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                                                <MessageSquare size={16} />
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <p className="text-sm font-bold text-slate-900 dark:text-slate-50">
                                                                    {notification.actorName}님이 댓글을 남겼습니다.
                                                                </p>
                                                                <p className="mt-1 line-clamp-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                                                    게시글: {notification.postTitle}
                                                                </p>
                                                                <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
                                                                    {notification.content}
                                                                </p>
                                                                <p className="mt-2 text-[11px] font-semibold text-slate-400">
                                                                    {new Date(notification.createdAt).toLocaleString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-5 py-16 text-center text-sm font-semibold text-slate-400">
                                                    아직 알림이 없습니다.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {user ? (
                            <div className="flex items-center gap-4 sm:gap-6">
                                <Link href="/profile" className="flex items-center gap-4 group">
                                    <div className="text-right hidden md:block">
                                        <p className={cn(
                                            "text-[10px] font-bold leading-none mb-1 uppercase tracking-widest",
                                            isScrolled ? "text-muted-foreground" : "text-white/70"
                                        )}>Status: Active</p>
                                        <p className={cn(
                                            "text-[14px] font-black leading-none uppercase",
                                            isScrolled ? "text-foreground group-hover:text-primary" : "text-white group-hover:text-primary"
                                        )}>{user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}</p>
                                    </div>
                                    <div className={cn(
                                        "flex h-9 w-9 items-center justify-center premium-transition group-hover:scale-105 sm:h-11 sm:w-11",
                                        isScrolled ? "bg-foreground text-background" : "bg-white text-black"
                                    )}>
                                        <UserIcon size={18} className="sm:size-[20px]" />
                                    </div>
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className={cn(
                                        "hidden sm:block text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-all",
                                        isScrolled ? "bg-slate-100 text-slate-900 hover:bg-slate-200" : "bg-white/10 text-white hover:bg-white/20"
                                    )}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link href="/login">
                                <Button 
                                    variant={isScrolled ? "black" : "outline"} 
                                    size="sm" 
                                    className={cn(
                                        "h-10 sm:h-11 px-6 sm:px-8",
                                        !isScrolled && "bg-white/10 text-white border-white/20 hover:bg-white hover:text-black"
                                    )}
                                >
                                    Login
                                </Button>
                            </Link>
                        )}

                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Open menu"
                            className={cn(
                                "min-[1200px]:hidden premium-transition hover:scale-110",
                                isScrolled ? "text-foreground" : "text-white"
                            )}
                        >
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Premium Full-Screen Overlay Menu */}
            <div className={cn(
                "fixed inset-0 z-[100] flex flex-col overflow-hidden premium-transition will-change-transform",
                "bg-black/98 dark:bg-black/98",
                isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
            )}>
                <div className="flex h-[78px] items-center justify-between border-b border-white/10 fluid-container">
                    <span className="text-3xl font-black text-white tracking-tighter">AOP</span>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-white hover:rotate-90 premium-transition p-2"
                    >
                        <X size={40} />
                    </button>
                </div>

                <div className="flex flex-grow flex-col justify-center space-y-6 fluid-container py-8 sm:space-y-10 overflow-y-auto">
                    {NAV_ITEMS.map((item, i) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="group block"
                        >
                            <span className="text-white/30 text-[12px] sm:text-[14px] font-black uppercase tracking-[0.3em] mb-3 block">0{i + 1}.</span>
                            <div className="flex items-center justify-between border-b border-white/10 pb-4 sm:pb-5">
                                <div>
                                    <h2 className="text-white text-[28px] sm:text-[42px] lg:text-[48px] font-black uppercase tracking-tight group-hover:text-primary premium-transition">
                                        {item.name}
                                    </h2>
                                    <p className="mt-1 sm:mt-2 text-[10px] sm:text-[12px] text-white/40 font-bold uppercase tracking-[0.18em]">{item.desc}</p>
                                </div>
                                <ChevronRight size={28} className="text-white/10 group-hover:text-primary group-hover:translate-x-2 premium-transition sm:size-12" />
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="border-t border-white/10 bg-white/5 py-5 sm:py-6 fluid-container">
                    <div className="flex flex-col gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
                        <span>Hanyang Univ ERICA</span>
                        <span>© 2024 Innovate Ahead</span>
                    </div>
                </div>
            </div>
            <SearchModal 
                isOpen={isSearchOpen} 
                onClose={() => setIsSearchOpen(false)} 
            />
        </>
    );
}
