import { useState, memo, useCallback, useEffect } from "react";
import Image from "next/image";
import { VideoContent } from "@/types";
import { Badge } from "@/components/common/Badge";
import { motion } from "framer-motion";
import { Play, User, Eye, Calendar, Loader2, PlusCircle } from "lucide-react";
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

export const VideoBoard = memo(function VideoBoard() {
  const [videos, setVideos] = useState<VideoContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      alert("교육 영상 등록 중 오류가 발생했습니다.");
    }
  }, [fetchVideos]);

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

      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-md premium-transition hover:-translate-y-0.5 hover:bg-primary hover:shadow-lg dark:bg-white dark:text-slate-900 dark:hover:bg-blue-400 dark:hover:text-white"
        >
          <PlusCircle size={18} />
          교육 영상 등록
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, index) => (
          <VideoCard key={video.id} video={video} index={index} />
        ))}
        
        {videos.length === 0 && (
          <div className="col-span-full rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 py-20 text-center text-slate-400 dark:border-slate-700 dark:bg-slate-800/30">
            <p className="font-bold text-sm">등록된 교육 영상이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
});

VideoBoard.displayName = "VideoBoard";
