import { motion } from "framer-motion";
import { Eye, Calendar, Clock, TrendingUp, Award, Star, Zap, AlertCircle } from "lucide-react";
import { Challenge } from "../types/Challenge";
import { getIconComponent } from "../utils/iconMapper";
import { formatDate, getDaysRemaining, getEndDate } from "../utils/dateUtils";

interface ChallengeCardProps {
  challenge: Challenge;
  onView: (challenge: Challenge) => void;
}

export function ChallengeCard({ challenge, onView }: ChallengeCardProps) {
  const IconComponent = getIconComponent({ iconName: challenge.icon });
  const endDate = getEndDate(challenge.startDate, challenge.totalDays);
  const daysRemaining = getDaysRemaining(endDate);

  const statusConfig = {
    active: {
      gradient: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      text: "text-emerald-700 dark:text-emerald-300",
      dot: "bg-emerald-500",
      border: "border-emerald-200 dark:border-emerald-800",
    },
    pending: {
      gradient: "from-amber-500 to-orange-600",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      text: "text-amber-700 dark:text-amber-300",
      dot: "bg-amber-500",
      border: "border-amber-200 dark:border-amber-800",
    },
    completed: {
      gradient: "from-slate-500 to-slate-600",
      bg: "bg-slate-50 dark:bg-slate-800/50",
      text: "text-slate-700 dark:text-slate-300",
      dot: "bg-slate-500",
      border: "border-slate-200 dark:border-slate-700",
    },
  };

  const difficultyConfig = {
    easy: { icon: Star, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/20" },
    medium: { icon: Zap, color: "text-yellow-500", bg: "bg-yellow-100 dark:bg-yellow-900/20" },
    hard: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/20" },
  };

  const priorityConfig = {
    low: { color: "text-slate-500", bg: "bg-slate-100 dark:bg-slate-800" },
    medium: { color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/20" },
    high: { color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/20" },
  };

  const progressPercentage = challenge.completedDays 
    ? Math.min((challenge.completedDays / challenge.totalDays) * 100, 100)
    : 0;

  const DifficultyIcon = difficultyConfig[challenge.difficulty].icon;

  const config = statusConfig[challenge.status];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
      
      <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
        {/* Status indicator bar */}
        <div className={`h-1 bg-gradient-to-r ${config.gradient}`}></div>
        
        {/* Banner Image */}
        <div className="relative h-32 overflow-hidden">
          <img 
            src={challenge.bannerImage} 
            alt={challenge.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute top-3 right-3 flex items-center space-x-2">
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${difficultyConfig[challenge.difficulty].bg} backdrop-blur-sm`}>
              <DifficultyIcon className={`w-3 h-3 ${difficultyConfig[challenge.difficulty].color}`} />
              <span className={`text-xs font-semibold ${difficultyConfig[challenge.difficulty].color} capitalize`}>
                {challenge.difficulty}
              </span>
            </div>
            <div className={`px-2 py-1 rounded-full ${priorityConfig[challenge.priority].bg} backdrop-blur-sm`}>
              <span className={`text-xs font-semibold ${priorityConfig[challenge.priority].color} capitalize`}>
                {challenge.priority}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-7">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} rounded-xl blur opacity-30`}></div>
                <div className={`relative p-3 rounded-xl bg-gradient-to-r ${config.gradient} text-white shadow-lg`}>
                  <IconComponent className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg leading-tight">
                  {challenge.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  {challenge.category}
                </p>
              </div>
            </div>

            <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${config.bg} ${config.border} border`}>
              <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
              <span className={`text-xs font-semibold ${config.text} uppercase tracking-wide`}>
                {challenge.status}
              </span>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 line-clamp-2 leading-relaxed">
            {challenge.description}
          </p>

          {/* Tags */}
          {challenge.tags && challenge.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {challenge.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
              {challenge.tags.length > 3 && (
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-full font-medium">
                  +{challenge.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Progress Bar */}
          {challenge.status === "active" && challenge.completedDays !== undefined && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Progress
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {challenge.completedDays}/{challenge.totalDays} days
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${config.gradient} transition-all duration-500`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          <div className="space-y-3 mb-8">
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
              <Calendar className="w-4 h-4 mr-3 text-slate-400" />
              <span className="font-medium">
                {formatDate(challenge.startDate)} → {formatDate(endDate)}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center text-slate-500 dark:text-slate-400">
                <Clock className="w-4 h-4 mr-3 text-slate-400" />
                <span className="font-medium">{challenge.totalDays} days total</span>
              </div>
              {challenge.status === "active" && daysRemaining > 0 && (
                <div className="flex items-center text-orange-600 dark:text-orange-400">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span className="font-semibold">{daysRemaining} days left</span>
                </div>
              )}
              {challenge.status === "completed" && (
                <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                  <Award className="w-3 h-3 mr-1" />
                  <span className="font-semibold">Completed</span>
                </div>
              )}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onView(challenge)}
            className={`w-full bg-gradient-to-r ${config.gradient} hover:shadow-lg text-white py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-md`}
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}