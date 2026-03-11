import { memo } from "react";
import { VideoContent } from "@/types";
import { Badge } from "@/components/common/Badge";
import { motion } from "framer-motion";
import { Play, Clock, User, Eye, Calendar } from "lucide-react";

const VideoCard = memo(({ video, index }: { video: VideoContent; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden group hover:shadow-xl transition-all flex flex-col h-full gpu-accelerated"
  >
    {/* Thumbnail Container */}
    <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
      <img 
        src={video.thumbnailUrl} 
        alt={video.title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-40 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
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
          {video.createdAt}
        </div>
      </div>
    </div>
  </motion.div>
));

VideoCard.displayName = "VideoCard";

interface VideoBoardProps {
  videos: VideoContent[];
}

export function VideoBoard({ videos }: VideoBoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {videos.map((video, index) => (
        <VideoCard key={video.id} video={video} index={index} />
      ))}
    </div>
  );
}
