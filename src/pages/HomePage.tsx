import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Grid3X3, List, Zap, X } from "lucide-react";
import { ChallengeCard } from "../components/ChallengeCard";
import { FilterControls } from "../components/FilterControls";
import { StatisticsPanel } from "../components/StatisticsPanel";
import { Challenge, FilterState, Statistics } from "../types/Challenge";
import { getEndDate } from "../utils/dateUtils";

interface HomePageProps {
  challenges: Challenge[];
}

export function HomePage({ challenges }: HomePageProps) {
  const navigate = useNavigate();
  const [showStats, setShowStats] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    status: "all",
    category: "all",
    difficulty: "all",
    priority: "all",
    tags: [],
    search: "",
    sortBy: "startDate",
    sortOrder: "desc",
  });

  const handleViewChallenge = (challenge: Challenge) => {
    navigate(`/challenge/${challenge.id}`);
  };

  const clearAllFilters = () => {
    setFilters({
      status: "all",
      category: "all",
      difficulty: "all",
      priority: "all",
      tags: [],
      search: "",
      sortBy: "startDate",
      sortOrder: "desc",
    });
  };

  const hasActiveFilters = filters.status !== "all" || 
    filters.category !== "all" || 
    filters.difficulty !== "all" || 
    filters.priority !== "all" || 
    filters.tags.length > 0 || 
    filters.search !== "";

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(challenges.map((c) => c.category))];
    return uniqueCategories.sort();
  }, [challenges]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    challenges.forEach(challenge => {
      challenge.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [challenges]);

  const filteredChallenges = useMemo(() => {
    let filtered = challenges;

    // Apply filters
    if (filters.status !== "all") {
      filtered = filtered.filter((c) => c.status === filters.status);
    }

    if (filters.category !== "all") {
      filtered = filtered.filter((c) => c.category === filters.category);
    }

    if (filters.difficulty !== "all") {
      filtered = filtered.filter((c) => c.difficulty === filters.difficulty);
    }

    if (filters.priority !== "all") {
      filtered = filtered.filter((c) => c.priority === filters.priority);
    }

    if (filters.tags.length > 0) {
      filtered = filtered.filter((c) => 
        filters.tags.some(tag => c.tags?.includes(tag))
      );
    }

    if (filters.search) {
      filtered = filtered.filter((c) =>
        c.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.tags?.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal: any;
      let bVal: any;

      switch (filters.sortBy) {
        case "startDate":
        case "endDate":
          aVal = new Date(a[filters.sortBy]).getTime();
          bVal = new Date(b[filters.sortBy]).getTime();
          break;
        case "endDate":
          aVal = new Date(getEndDate(a.startDate, a.totalDays)).getTime();
          bVal = new Date(getEndDate(b.startDate, b.totalDays)).getTime();
          break;
        case "title":
          aVal = a[filters.sortBy].toLowerCase();
          bVal = b[filters.sortBy].toLowerCase();
          break;
        case "status":
          const statusOrder = { active: 1, pending: 2, completed: 3 };
          aVal = statusOrder[a.status];
          bVal = statusOrder[b.status];
          break;
        default:
          aVal = a[filters.sortBy as keyof Challenge];
          bVal = b[filters.sortBy as keyof Challenge];
      }

      if (filters.sortOrder === "asc") {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

    return filtered;
  }, [challenges, filters]);

  const statistics = useMemo<Statistics>(() => {
    const total = challenges.length;
    const active = challenges.filter((c) => c.status === "active").length;
    const completed = challenges.filter((c) => c.status === "completed").length;
    const pending = challenges.filter((c) => c.status === "pending").length;

    const categoryCounts = challenges.reduce((acc, challenge) => {
      acc[challenge.category] = (acc[challenge.category] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const difficultyCounts = challenges.reduce((acc, challenge) => {
      acc[challenge.difficulty] = (acc[challenge.difficulty] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const priorityCounts = challenges.reduce((acc, challenge) => {
      acc[challenge.priority] = (acc[challenge.priority] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Mock data for advanced analytics
    const streakData = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      completed: Math.floor(Math.random() * 5)
    }));

    const monthlyProgress = Array.from({ length: 6 }, (_, i) => ({
      month: new Date(Date.now() - (5 - i) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' }),
      completed: Math.floor(Math.random() * 10) + 5,
      total: Math.floor(Math.random() * 5) + 15
    }));

    return {
      totalChallenges: total,
      activeChallenges: active,
      completedChallenges: completed,
      pendingChallenges: pending,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
      categoryCounts,
      difficultyCounts,
      priorityCounts,
      averageCompletionTime: 45,
      streakData,
      monthlyProgress,
    };
  }, [challenges]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Hero Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
        <div className="relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 p-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight"
              >
                Your Challenge Journey
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-slate-600 dark:text-slate-300 mt-3 text-lg leading-relaxed"
              >
                Transform your goals into achievements with intelligent tracking and insights
              </motion.p>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowStats(!showStats)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  showStats 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'bg-slate-100/80 hover:bg-slate-200/80 dark:bg-slate-700/80 dark:hover:bg-slate-600/80 text-slate-700 dark:text-slate-300'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>{showStats ? "Hide Analytics" : "Show Analytics"}</span>
              </motion.button>

              <div className="flex items-center bg-slate-100/80 dark:bg-slate-700/80 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white dark:bg-slate-600 shadow-sm' 
                      : 'hover:bg-slate-200/50 dark:hover:bg-slate-600/50'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white dark:bg-slate-600 shadow-sm' 
                      : 'hover:bg-slate-200/50 dark:hover:bg-slate-600/50'
                  }`}
                >
                  <List className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <StatisticsPanel statistics={statistics} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <FilterControls
        filters={filters}
        onFilterChange={setFilters}
        categories={categories}
        allTags={allTags}
      />

      {/* Challenge Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Active Challenges
          </h2>
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm font-semibold text-slate-600 dark:text-slate-400">
            {filteredChallenges.length}
          </span>
        </div>
        
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearAllFilters}
            className="flex items-center space-x-2 px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl transition-all duration-200 font-medium"
          >
            <X className="w-4 h-4" />
            <span>Clear Filters</span>
          </motion.button>
        )}
      </div>

      {/* Challenge Grid/List */}
      <motion.div
        layout
        className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
            : "space-y-6"
        }
      >
        <AnimatePresence mode="popLayout">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onView={handleViewChallenge}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredChallenges.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
            <div className="relative text-8xl mb-6">🎯</div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            No challenges found
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
            {challenges.length === 0
              ? "Ready to start your journey? Add your first challenge and begin tracking your progress!"
              : "Try adjusting your filters to discover more challenges that match your criteria."}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}