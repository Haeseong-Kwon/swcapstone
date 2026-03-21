import { useState, memo, useCallback, useEffect } from "react";
import Image from "next/image";
import { Proposal } from "@/types";
import { Badge } from "@/components/common/Badge";
import { motion } from "framer-motion";
import { Briefcase, ArrowRight, Loader2 } from "lucide-react";
import { getCorporateProposals } from "@/lib/services/BoardServices";

const ProposalListItem = memo(({ proposal, index }: { proposal: Proposal; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm p-6 hover:shadow-md hover:border-primary dark:hover:border-blue-400 transition-all group flex flex-col md:flex-row gap-6 items-start md:items-center gpu-accelerated rounded-2xl cursor-pointer"
  >
    {/* Left: Logo & Company Name */}
    <div className="flex items-center gap-4 min-w-[200px]">
      <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0 overflow-hidden">
        {proposal.companyLogo ? (
          <Image
            src={proposal.companyLogo}
            alt={proposal.companyName}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        ) : (
          <Briefcase size={20} />
        )}
      </div>
      <div>
        <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{proposal.category === 'GOVERNMENT' ? '공공/지자체' : '기업'}</p>
        <p className="text-sm font-bold text-slate-900 dark:text-slate-50">{proposal.companyName}</p>
      </div>
    </div>

    {/* Middle: Title, Description & Tags */}
    <div className="flex-grow">
      <div className="flex items-center gap-3 mb-2">
        <h3 className="text-lg font-black text-slate-900 dark:text-slate-50 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors line-clamp-1">{proposal.title}</h3>
        {proposal.isHot && <Badge variant="warning" className="animate-pulse shrink-0 px-2 py-0 text-[10px]">HOT</Badge>}
      </div>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 line-clamp-1 mb-3">{proposal.description}</p>
      <div className="flex flex-wrap gap-2">
        {proposal.keywords.map((keyword) => (
          <span key={keyword} className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
            #{keyword}
          </span>
        ))}
      </div>
    </div>

    {/* Right: Deadline & Action */}
    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto gap-4 md:gap-2 shrink-0 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 pt-4 md:pt-0 md:pl-6">
      <div className="text-left md:text-right">
        <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">마감기한</div>
        <div className="text-sm font-black text-slate-900 dark:text-slate-50">{proposal.deadline}</div>
      </div>
      <button className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shrink-0">
        <ArrowRight size={18} />
      </button>
    </div>
  </motion.div>
));

ProposalListItem.displayName = "ProposalListItem";

export const CorporateBoard = memo(function CorporateBoard() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProposals = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCorporateProposals();
      const mappedData: Proposal[] = data.map((item: any) => ({
        id: item.id,
        companyName: item.company_name,
        companyLogo: item.thumbnail_url,
        title: item.title,
        description: item.content,
        deadline: item.deadline || "상시모집",
        category: (item.category && item.category[0]) || 'CORPORATE',
        isHot: false,
        keywords: item.category || [],
        hasMentoring: true,
        benefits: []
      }));
      setProposals(mappedData);
    } catch (error) {
      console.error("Error fetching corporate proposals:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  if (loading && proposals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-500">
        <Loader2 className="animate-spin" size={40} />
        <p className="font-bold tracking-widest uppercase text-xs">Loading Proposals...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 transform-gpu">
      {proposals.map((proposal, index) => (
        <ProposalListItem key={proposal.id} proposal={proposal} index={index} />
      ))}
      
      {proposals.length === 0 && (
        <div className="text-center py-20 text-slate-400 bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
          <p className="font-bold text-sm">등록된 기업 제안 프로젝트가 없습니다.</p>
        </div>
      )}
    </div>
  );
});

CorporateBoard.displayName = "CorporateBoard";
