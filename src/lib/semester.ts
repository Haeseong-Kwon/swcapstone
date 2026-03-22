export type AcademicTerm = "SPRING" | "FALL";
export type CourseTrack = "SW_CAPSTONE_1" | "SW_CAPSTONE_2";

export interface SemesterOption {
  key: string;
  year: number;
  term: AcademicTerm;
  courseTrack: CourseTrack;
  label: string;
  courseLabel: string;
  description: string;
}

export const getCourseTrackForTerm = (term: AcademicTerm): CourseTrack =>
  term === "SPRING" ? "SW_CAPSTONE_2" : "SW_CAPSTONE_1";

export const buildSemesterOption = (year: number, term: AcademicTerm): SemesterOption => {
  const courseTrack = getCourseTrackForTerm(term);
  const termNumber = term === "SPRING" ? "1" : "2";
  const courseLabel = courseTrack === "SW_CAPSTONE_2" ? "SW창업캡스톤디자인2" : "SW창업캡스톤디자인1";

  return {
    key: `${year}-${termNumber}`,
    year,
    term,
    courseTrack,
    label: `${year}년 ${termNumber}학기`,
    courseLabel,
    description:
      term === "SPRING"
        ? "신규 팀의 고도화와 캡스톤 2 운영 학기"
        : "새 cohort 유입과 캡스톤 1 시작 학기",
  };
};

export const getCurrentSemesterOption = (date = new Date()): SemesterOption => {
  const month = date.getMonth() + 1;
  const term: AcademicTerm = month >= 3 && month <= 8 ? "SPRING" : "FALL";
  return buildSemesterOption(date.getFullYear(), term);
};

export const getSemesterOptions = (date = new Date()): SemesterOption[] => {
  const current = getCurrentSemesterOption(date);
  const candidates = [
    buildSemesterOption(current.year + 1, "SPRING"),
    buildSemesterOption(current.year, "FALL"),
    buildSemesterOption(current.year, "SPRING"),
    buildSemesterOption(current.year - 1, "FALL"),
    buildSemesterOption(current.year - 1, "SPRING"),
  ];

  const unique = new Map<string, SemesterOption>();
  candidates.forEach((option) => unique.set(option.key, option));

  return Array.from(unique.values()).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    if (a.term === b.term) return 0;
    return a.term === "FALL" ? -1 : 1;
  });
};
