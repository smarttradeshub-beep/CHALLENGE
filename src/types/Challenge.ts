export interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  bannerImage: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  excelFile: string;
  status: 'active' | 'pending' | 'completed';
  startDate: string;
  totalDays: number;
  priority: 'low' | 'medium' | 'high';
  completedDays?: number;
}

export interface ChallengeTemplate {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  defaultDuration: number;
  sampleData: any[][];
}

export interface FilterState {
  status: string;
  category: string;
  difficulty: string;
  priority: string;
  tags: string[];
  search: string;
  sortBy: 'startDate' | 'endDate' | 'status' | 'title';
  sortOrder: 'asc' | 'desc';
}

export interface Statistics {
  totalChallenges: number;
  activeChallenges: number;
  completedChallenges: number;
  pendingChallenges: number;
  completionRate: number;
  categoryCounts: { [key: string]: number };
  difficultyCounts: { [key: string]: number };
  priorityCounts: { [key: string]: number };
  averageCompletionTime: number;
  streakData: { date: string; completed: number }[];
  monthlyProgress: { month: string; completed: number; total: number }[];
}