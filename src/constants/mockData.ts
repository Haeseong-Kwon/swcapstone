import { Project, Proposal, TeamBuildingPost, User, VideoContent, InsightArticle, RegisteredTeam, PortfolioItem } from "@/types";

export const MOCK_USERS: User[] = [
    {
        id: 'u1',
        name: '김철수',
        email: 'chulsoo@hanyang.ac.kr',
        role: 'STUDENT',
        specialty: '프론트엔드',
        major: '컴퓨터소프트웨어학부',
        techStack: ['React', 'TypeScript', 'Tailwind'],
        status: 'LOOKING',
        githubUrl: 'https://github.com',
        blogUrl: 'https://velog.io'
    },
    { 
        id: 'u4', 
        name: '최민수', 
        email: 'minsu@hanyang.ac.kr', 
        role: 'STUDENT', 
        specialty: '백엔드',
        major: 'ICT융합학부',
        techStack: ['Node.js', 'NestJS', 'PostgreSQL'],
        status: 'COMPLETED'
    },
    { 
        id: 'u5', 
        name: '이지민', 
        email: 'jimin@hanyang.ac.kr', 
        role: 'STUDENT', 
        specialty: 'UI/UX 디자인',
        major: '영상디자인학과',
        techStack: ['Figma', 'Adobe XD'],
        status: 'LOOKING'
    },
];

export const MOCK_TEAM_POSTS: TeamBuildingPost[] = [
    {
        id: 't1',
        title: 'AI 기반 퍼스널 컬러 진단 앱 팀원 모집',
        content: '현재 기획과 디자인은 완료되었으며, 개발을 함께할 프론트엔드/백엔드 개발자를 찾습니다.',
        authorId: 'u2',
        authorName: '이영희',
        tags: ['AI', 'React Native', '스타트업'],
        projectPhase: 'IDEA',
        recruitingRoles: [
            { role: '기획', current: 1, total: 1 },
            { role: 'FE', current: 0, total: 2 },
            { role: 'BE', current: 1, total: 2 }
        ],
        courseBadge: 'CAPSTONE_1',
        createdAt: '2024-03-08',
    },
    {
        id: 't2',
        title: '반려동물 산책 커뮤니티 "멍프렌즈" 서비스 고도화',
        content: 'MVP 개발이 완료된 상태이며, 함께 스케일업할 개발자를 모집합니다.',
        authorId: 'u1',
        authorName: '김철수',
        tags: ['커뮤니티', 'Next.js', '스케일업'],
        projectPhase: 'MVP',
        recruitingRoles: [
            { role: '기획', current: 1, total: 1 },
            { role: 'FE', current: 1, total: 2 },
            { role: 'BE', current: 2, total: 2 }
        ],
        courseBadge: 'CAPSTONE_2',
        createdAt: '2024-03-09',
    },
];

export const MOCK_PROPOSALS: Proposal[] = [
    {
        id: 'pr1',
        companyName: '안산시청',
        title: '2024 청년 창업 지원 사업 (안산 테크노파크)',
        description: '안산 지역 청년 예비 창업자를 위한 사업화 자금 최대 5천만원 지원',
        deadline: '2024-04-30',
        category: 'GOVERNMENT',
        isHot: true,
        keywords: ['공공 프로젝트', '창업 지원'],
        hasMentoring: true,
        benefits: ['사업화 자금', '사무 공간 제공']
    },
    {
        id: 'pr2',
        companyName: '카카오 벤처스',
        title: 'Campus Startup Pitch Day 2024',
        description: '대학생 예비 창업팀을 위한 시드 투자 및 멘토링 프로그램',
        deadline: '2024-05-15',
        category: 'CORPORATE',
        reward: '시드 투자 기회 및 카카오 멘토링',
        keywords: ['AI 솔루션', '핀테크'],
        hasMentoring: true,
        benefits: ['시드 투자', '전문가 멘토링']
    },
];

export const MOCK_VIDEOS: VideoContent[] = [
    {
        id: 'v1',
        title: '2024 창업가 정신과 실전 비즈니스 모델',
        description: '성공적인 스타트업 창업을 위한 핵심 가치와 비즈니스 모델 설계 전략을 학습합니다.',
        instructor: '박지훈 교수',
        duration: '45:20',
        thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
        category: '창업 기초',
        createdAt: '2024-03-01',
        viewCount: 1240
    },
    {
        id: 'v2',
        title: 'MVP 개발을 위한 린 스타트업 실무',
        description: '최소 기능 제품(MVP) 개발 프로세스와 고객 피드백 반영을 통한 스케일업 전략입니다.',
        instructor: '정미선 대표',
        duration: '38:15',
        thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop',
        category: '실전 개발',
        createdAt: '2024-03-05',
        viewCount: 856
    },
    {
        id: 'v3',
        title: '스타트업 투자 유치를 위한 IR 피칭의 정석',
        description: 'VC의 마음을 사로잡는 강력한 IR 덱 구성과 효과적인 피치 기법을 공개합니다.',
        instructor: '강한결 파트너',
        duration: '52:40',
        thumbnailUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop',
        category: '투자/유치',
        createdAt: '2024-03-07',
        viewCount: 2100
    }
];

export const MOCK_INSIGHTS: InsightArticle[] = [
    {
        id: 'i1',
        title: '초기 스타트업을 위한 정부지원사업 합격 노하우',
        excerpt: '창업진흥원 예비창업패키지, 초기창업패키지 합격을 위한 사업계획서 작성 전략과 유의점.',
        category: '지원사업',
        thumbnailUrl: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1974&auto=format&fit=crop',
        author: '에리카 창업지원단',
        date: '2024.03.11',
        readTime: '5 min read'
    },
    {
        id: 'i2',
        title: '투자자가 좋아하는 IR Pitch Deck 플로우',
        excerpt: '프리시드(Pre-Seed)부터 시리즈A까지, 투자자를 설득하는 IR 덱의 필수 구성 스토리보드 템플릿.',
        category: '창업투자',
        thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop',
        author: '위티(WITI) 리서치',
        date: '2024.03.08',
        readTime: '7 min read'
    },
    {
        id: 'i3',
        title: 'MVP(최소기능제품) 없이 시장 검증하는 3가지 방법',
        excerpt: '랜딩페이지, 노코드(No-code) 툴, 그리고 크라우드펀딩을 활용한 빠르고 효율적인 시장 검증 노하우.',
        category: '창업노하우',
        thumbnailUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
        author: '김스타트업 대표',
        date: '2024.03.05',
        readTime: '4 min read'
    },
    {
        id: 'i4',
        title: '실패하는 팀 매칭의 5가지 전조증상',
        excerpt: '스타트업 실패의 60%는 팀원 간의 불화. 성공적인 코파운더(Co-founder) 매칭을 위한 체크리스트.',
        category: '스타트업',
        thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
        author: '인사이트랩',
        date: '2024.03.01',
        readTime: '6 min read'
    }
];

export const MOCK_REGISTERED_TEAMS: RegisteredTeam[] = [
    {
        id: 'rt1',
        teamName: 'EcoRoute',
        productIdea: '전기차 최적 경로 생성 및 충전소 예약 통합 플랫폼',
        leaderName: '김철수',
        members: [
            { role: '기획/PM', name: '김철수' },
            { role: '프론트엔드', name: '이영희' },
            { role: '백엔드', name: '박민수' }
        ],
        contactEmail: 'contact@ecoroute.io',
        status: 'ACTIVE'
    },
    {
        id: 'rt2',
        teamName: '멍프렌즈',
        productIdea: '반려동물 실시간 산책 메이트 매칭 커뮤니티',
        leaderName: '최지원',
        members: [
            { role: '리더/기획', name: '최지원' },
            { role: '디자인', name: '정민아' },
            { role: '개발', name: '김동현' }
        ],
        contactEmail: 'hello@mungfriend.com',
        status: 'COMPLETED'
    }
];

export const MOCK_PORTFOLIOS: PortfolioItem[] = [
    {
        id: 'p1',
        title: 'METASURFACE LENS DESIGNER',
        client: 'T-MES',
        year: '2024',
        thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop',
        videoUrl: '#',
        irDeckUrl: '/mock-ir-deck.pdf',
        categories: ['Deep Tech', 'AI Simulation']
    },
    {
        id: 'p2',
        title: 'ENTERPRISE AI DASHBOARD',
        client: 'INNOVATE CORP',
        year: '2024',
        thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
        videoUrl: '#',
        irDeckUrl: '/mock-ir-deck.pdf',
        categories: ['B2B SaaS', 'Data Viz']
    },
    {
        id: 'p3',
        title: 'ROBOTICS VISION SYSTEM',
        client: 'AUTO-ROBOTICS',
        year: '2023',
        thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop',
        irDeckUrl: '/mock-ir-deck.pdf',
        categories: ['Hardware', 'Computer Vision']
    },
    {
        id: 'p4',
        title: 'FINTECH ONBOARDING EXP',
        client: 'NEXTBANK',
        year: '2023',
        thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop',
        videoUrl: '#',
        categories: ['Fintech', 'UX/UI']
    }
];
