import { useState, memo, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import { VideoContent } from "@/types";
import { Badge } from "@/components/common/Badge";
import { motion } from "framer-motion";
import { Play, User, Eye, Calendar, Loader2, PlusCircle, Search, Library, Sparkles } from "lucide-react";
import { createVideo, getVideos } from "@/lib/services/BoardServices";
import { VideoUploadModal } from "./VideoUploadModal";

const VideoCard = memo(({ video, index }: { video: VideoContent; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden group hover:shadow-xl transition-all flex flex-col h-full gpu-accelerated rounded-2xl"
  >
    {/* Thumbnail Container */}
    <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
      <Image
        src={video.thumbnailUrl}
        alt={video.title}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-700"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-60 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
          <Play className="text-white fill-white" size={20} />
        </div>
      </div>
      <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-[10px] font-bold rounded">
        {video.duration}
      </div>
    </div>

    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-4">
        <Badge variant="primary">{video.category}</Badge>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
          <Eye size={12} />
          {video.viewCount.toLocaleString()}
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors line-clamp-2">
        {video.title}
      </h3>
      <p className="text-slate-700 dark:text-slate-300 text-xs mb-6 line-clamp-2 leading-relaxed">
        {video.description}
      </p>

      <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
            <User size={12} className="text-slate-500 dark:text-slate-400" />
          </div>
          <span className="text-xs font-bold text-slate-900 dark:text-slate-50">{video.instructor}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600 dark:text-slate-400">
          <Calendar size={12} />
          {new Date(video.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  </motion.div>
));

VideoCard.displayName = "VideoCard";

export const VideoBoard = memo(function VideoBoard({
  isAuthenticated,
  onRequireLogin,
}: {
  isAuthenticated: boolean;
  onRequireLogin: () => void;
}) {
  const [videos, setVideos] = useState<VideoContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getVideos();
      const mappedData: VideoContent[] = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        videoUrl: item.video_url,
        instructor: item.instructor || "전문가",
        duration: item.duration || "15:00",
        thumbnailUrl: item.thumbnail_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
        category: item.category || "교육",
        createdAt: item.created_at,
        viewCount: item.view_count || 0
      }));
      setVideos(mappedData);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleUploadVideo = useCallback(async (video: VideoContent) => {
    try {
      await createVideo({
        title: video.title,
        description: video.description,
        video_url: video.videoUrl,
        thumbnail_url: video.thumbnailUrl,
        instructor: video.instructor,
        duration: video.duration,
        category: video.category,
        view_count: 0,
      });
      await fetchVideos();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error uploading video:", error);
      alert(error instanceof Error ? error.message : "교육 영상 등록 중 오류가 발생했습니다.");
    }
  }, [fetchVideos]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(videos.map((video) => video.category).filter(Boolean)));
    return ["ALL", ...uniqueCategories];
  }, [videos]);

  const filteredVideos = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return videos.filter((video) => {
      const matchesCategory = activeCategory === "ALL" || video.category === activeCategory;
      const haystack = [video.title, video.description, video.instructor, video.category]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery, videos]);

  const featuredVideo = filteredVideos[0];
  const remainingVideos = featuredVideo ? filteredVideos.slice(1) : [];

  if (loading && videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-500">
        <Loader2 className="animate-spin" size={40} />
        <p className="font-bold tracking-widest uppercase text-xs">Loading Videos...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 transform-gpu">
      <VideoUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUploadVideo}
      />

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
          <div className="border-b border-slate-100 p-6 dark:border-slate-800 lg:border-b-0 lg:border-r lg:p-8">
            <div className="flex items-start justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-primary dark:text-blue-400">
                  Video Archive
                </p>
                <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">
                  학기와 무관하게 쌓이는 창업 러닝 라이브러리
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  강의, 사례, 실무 가이드를 한 곳에 축적해 두고 언제든 다시 꺼내보는 구조입니다.
                </p>
              </div>
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    onRequireLogin();
                    return;
                  }
                  setIsModalOpen(true);
                }}
                className="hidden items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-md premium-transition hover:-translate-y-0.5 hover:bg-primary hover:shadow-lg dark:bg-white dark:text-slate-900 dark:hover:bg-blue-400 dark:hover:text-white lg:flex"
              >
                <PlusCircle size={18} />
                교육 영상 등록
              </button>
            </div>
          </div>

          <div className="grid gap-3 p-6 sm:grid-cols-3 lg:p-8">
            {[
              { icon: <Library size={18} />, label: "Archive", value: `${videos.length} Videos` },
              { icon: <Sparkles size={18} />, label: "Categories", value: `${Math.max(categories.length - 1, 0)} Topics` },
              { icon: <Play size={18} />, label: "Reusable", value: "Always Available" },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-950/40">
                <div className="mb-4 inline-flex rounded-2xl bg-white p-3 text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200">
                  {item.icon}
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
                <p className="mt-2 text-sm font-black text-slate-900 dark:text-slate-50">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="제목, 설명, 강사명으로 검색"
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-5 text-sm font-semibold text-slate-900 outline-none premium-transition placeholder:text-slate-400 focus:border-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50 dark:focus:border-blue-400"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] premium-transition ${
                activeCategory === category
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {category === "ALL" ? "All Topics" : category}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            if (!isAuthenticated) {
              onRequireLogin();
              return;
            }
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-md premium-transition hover:-translate-y-0.5 hover:bg-primary hover:shadow-lg dark:bg-white dark:text-slate-900 dark:hover:bg-blue-400 dark:hover:text-white lg:hidden"
        >
          <PlusCircle size={18} />
          교육 영상 등록
        </button>
      </div>

      {featuredVideo ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:p-5"
        >
          <div className="relative aspect-video overflow-hidden rounded-[1.5rem]">
            <Image
              src={featuredVideo.thumbnailUrl}
              alt={featuredVideo.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 inline-flex rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-white backdrop-blur">
                  Featured Session
                </p>
                <h4 className="text-2xl font-black text-white">{featuredVideo.title}</h4>
              </div>
              <div className="rounded-full bg-white/15 p-4 text-white backdrop-blur">
                <Play className="fill-white" size={20} />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[1.5rem] bg-slate-50/80 p-6 dark:bg-slate-950/40">
            <div>
              <Badge variant="primary">{featuredVideo.category}</Badge>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {featuredVideo.description}
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl bg-white px-4 py-3 dark:bg-slate-900">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Instructor</p>
                <p className="mt-2 text-sm font-black text-slate-900 dark:text-slate-50">{featuredVideo.instructor}</p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3 dark:bg-slate-900">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Duration</p>
                <p className="mt-2 text-sm font-black text-slate-900 dark:text-slate-50">{featuredVideo.duration}</p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3 dark:bg-slate-900">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Published</p>
                <p className="mt-2 text-sm font-black text-slate-900 dark:text-slate-50">
                  {new Date(featuredVideo.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {remainingVideos.map((video, index) => (
          <VideoCard key={video.id} video={video} index={index} />
        ))}
        
        {filteredVideos.length === 0 && (
          <div className="col-span-full rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 py-20 text-center text-slate-400 dark:border-slate-700 dark:bg-slate-800/30">
            <p className="font-bold text-sm">조건에 맞는 교육 영상이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
});

VideoBoard.displayName = "VideoBoard";
