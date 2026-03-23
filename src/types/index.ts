
export type UserRole = 'STUDENT' | 'PROFESSOR' | 'GENERAL';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  specialty?: string;
  major?: string;
  techStack?: string[];
  status?: 'LOOKING' | 'COMPLETED';
  githubUrl?: string;
  blogUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'PLANNING' | 'BUILDING' | 'COMPLETED';
  courseId: 'COURSE_1' | 'COURSE_2';
  studentId: string;
  businessModel?: string;
  businessPlanUrl?: string;
  irDeckUrl?: string;
  githubUrl?: string;
  demoVideoUrl?: string;
  techStack?: string[];
  createdAt: string;
}

export interface TeamBuildingPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  tags: string[];
  projectPhase: 'IDEA' | 'MVP' | 'SCALE';
  recruitingRoles: {
    role: string;
    current: number;
    total: number;
  }[];
  courseBadge: 'CAPSTONE_1' | 'CAPSTONE_2';
  createdAt: string;
}

export interface PostComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  recipientId: string;
  actorId: string;
  actorName: string;
  type: 'NEW_COMMENT';
  postId: string;
  postTitle: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface Proposal {
  id: string;
  companyName: string;
  companyLogo?: string;
  title: string;
  description: string;
  deadline: string;
  category: 'GOVERNMENT' | 'CORPORATE';
  reward?: string;
  isHot?: boolean;
  keywords: string[];
  hasMentoring: boolean;
  benefits: string[];
}

export interface VideoContent {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  instructor: string;
  duration: string;
  thumbnailUrl: string;
  category: string;
  createdAt: string;
  viewCount: number;
}

export interface InsightArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  thumbnailUrl: string;
  author: string;
  date: string;
  readTime: string;
}

export interface RegisteredTeam {
  id: string;
  teamName: string;
  productIdea: string;
  leaderName: string;
  members: { role: string; name: string }[];
  contactEmail: string;
  status: 'ACTIVE' | 'COMPLETED';
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  year: string;
  thumbnailUrl: string;
  videoUrl?: string; // Optional URL for video playback
  irDeckUrl?: string; // Optional URL for IR Deck PDF download
  categories: string[];
}
