import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { 
  TrendingUp, 
  Target, 
  CheckCircle, 
  Activity, 
  BarChart3, 
  Calendar,
  Clock,
  Award,
  Zap,
  Star,
  AlertTriangle,
  Users,
  Trophy,
  Flame
} from "lucide-react";
import { Challenge, Statistics } from "../types/Challenge";
import { getEndDate } from "../utils/dateUtils";

interface AnalyticsPageProps {
  challenges: Challenge[];
}

const COLORS = [
  "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899",
  "#06B6D4", "#84CC16", "#F97316", "#6366F1"
];

export function AnalyticsPage({ challenges }: AnalyticsPageProps) {
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

    // Generate mock streak data for the last 30 days
    const streakData = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      completed: Math.floor(Math.random() * 5) + 1
    }));

    // Generate mock monthly progress data
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
      averageCompletionTime: 42,
      streakData,
      monthlyProgress,
    };
  }, [challenges]);

  const categoryData = Object.entries(statistics.categoryCounts).map(
    ([name, value]) => ({ name, value })
  );

  const difficultyData = Object.entries(statistics.difficultyCounts).map(
    ([name, value]) => ({ name, value })
  );

  const priorityData = Object.entries(statistics.priorityCounts).map(
    ([name, value]) => ({ name, value })
  );

  // Performance radar data
  const performanceData = [
    { subject: 'Consistency', A: 85, fullMark: 100 },
    { subject: 'Completion Rate', A: statistics.completionRate, fullMark: 100 },
    { subject: 'Challenge Variety', A: Object.keys(statistics.categoryCounts).length * 20, fullMark: 100 },
    { subject: 'Difficulty Balance', A: 75, fullMark: 100 },
    { subject: 'Time Management', A: 90, fullMark: 100 },
    { subject: 'Goal Achievement', A: 80, fullMark: 100 },
  ];

  const stats = [
    {
      label: "Total Challenges",
      value: statistics.totalChallenges,
      icon: Target,
      gradient: "from-blue-500 to-blue-600",
      textColor: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      change: "+12%",
      changeType: "positive"
    },
    {
      label: "Active Challenges",
      value: statistics.activeChallenges,
      icon: Activity,
      gradient: "from-emerald-500 to-emerald-600",
      textColor: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      change: "+5%",
      changeType: "positive"
    },
    {
      label: "Completed",
      value: statistics.completedChallenges,
      icon: CheckCircle,
      gradient: "from-purple-500 to-purple-600",
      textColor: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      change: "+23%",
      changeType: "positive"
    },
    {
      label: "Success Rate",
      value: `${statistics.completionRate.toFixed(1)}%`,
      icon: TrendingUp,
      gradient: "from-orange-500 to-orange-600",
      textColor: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      change: "+8%",
      changeType: "positive"
    },
    {
      label: "Current Streak",
      value: "12 days",
      icon: Flame,
      gradient: "from-red-500 to-red-600",
      textColor: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      change: "+3 days",
      changeType: "positive"
    },
    {
      label: "Avg. Completion",
      value: `${statistics.averageCompletionTime} days`,
      icon: Clock,
      gradient: "from-indigo-500 to-indigo-600",
      textColor: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      change: "-5 days",
      changeType: "positive"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
        <div className="relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 p-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                Advanced Analytics
              </h1>
              <p className="text-slate-600 dark:text-slate-300 mt-2 text-lg">
                Deep insights into your challenge performance and progress patterns
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all duration-500`}></div>
            
            <div className={`relative ${stat.bgColor} backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-lg`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  stat.changeType === 'positive' 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' 
                    : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1">
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50"></div>
          <div className="relative p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3"></div>
              Category Distribution
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Difficulty Analysis */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50"></div>
          <div className="relative p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full mr-3"></div>
              Difficulty Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={difficultyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: 'currentColor' }}
                  className="fill-slate-600 dark:fill-slate-400"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: 'currentColor' }}
                  className="fill-slate-600 dark:fill-slate-400"
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="url(#difficultyGradient)"
                  radius={[6, 6, 0, 0]}
                />
                <defs>
                  <linearGradient id="difficultyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.9} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Daily Activity Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative lg:col-span-2"
        >
          <div className="absolute inset-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50"></div>
          <div className="relative p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mr-3"></div>
              30-Day Activity Streak
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={statistics.streakData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: 'currentColor' }}
                  className="fill-slate-600 dark:fill-slate-400"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => new Date(value).getDate().toString()}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: 'currentColor' }}
                  className="fill-slate-600 dark:fill-slate-400"
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  }}
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#F97316"
                  fill="url(#streakGradient)"
                  strokeWidth={3}
                />
                <defs>
                  <linearGradient id="streakGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Performance Radar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50"></div>
          <div className="relative p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mr-3"></div>
              Performance Analysis
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={performanceData}>
                <PolarGrid stroke="rgba(148, 163, 184, 0.3)" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fontSize: 11, fill: 'currentColor' }}
                  className="fill-slate-600 dark:fill-slate-400"
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fontSize: 10, fill: 'currentColor' }}
                  className="fill-slate-600 dark:fill-slate-400"
                />
                <Radar
                  name="Performance"
                  dataKey="A"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Monthly Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50"></div>
          <div className="relative p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full mr-3"></div>
              Monthly Progress
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={statistics.monthlyProgress} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: 'currentColor' }}
                  className="fill-slate-600 dark:fill-slate-400"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: 'currentColor' }}
                  className="fill-slate-600 dark:fill-slate-400"
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#94A3B8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#94A3B8', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Insights Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50"></div>
        <div className="relative p-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center">
            <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full mr-3"></div>
            AI-Powered Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
              <div className="flex items-center space-x-3 mb-3">
                <Trophy className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">Peak Performance</h4>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Your completion rate has improved by 23% this month. Keep up the excellent momentum!
              </p>
            </div>
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50">
              <div className="flex items-center space-x-3 mb-3">
                <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <h4 className="font-semibold text-emerald-900 dark:text-emerald-100">Consistency Streak</h4>
              </div>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                You've maintained a 12-day streak. Consider adding a medium difficulty challenge to maintain growth.
              </p>
            </div>
            <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200/50 dark:border-amber-800/50">
              <div className="flex items-center space-x-3 mb-3">
                <Star className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                <h4 className="font-semibold text-amber-900 dark:text-amber-100">Optimization Tip</h4>
              </div>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Focus on fitness challenges - they show the highest completion rate in your profile.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}