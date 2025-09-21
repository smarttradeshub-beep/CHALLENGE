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
} from "recharts";
import { TrendingUp, Target, CheckCircle, Activity, BarChart3 } from "lucide-react";
import { Statistics } from "../types/Challenge";

interface StatisticsPanelProps {
  statistics: Statistics;
}

const COLORS = [
  "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899",
  "#06B6D4", "#84CC16", "#F97316", "#6366F1"
];

export function StatisticsPanel({ statistics }: StatisticsPanelProps) {
  const categoryData = Object.entries(statistics.categoryCounts).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const stats = [
    {
      label: "Total Challenges",
      value: statistics.totalChallenges,
      icon: Target,
      gradient: "from-blue-500 to-blue-600",
      textColor: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      label: "Active Challenges",
      value: statistics.activeChallenges,
      icon: Activity,
      gradient: "from-emerald-500 to-emerald-600",
      textColor: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      label: "Completed",
      value: statistics.completedChallenges,
      icon: CheckCircle,
      gradient: "from-purple-500 to-purple-600",
      textColor: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      label: "Success Rate",
      value: `${statistics.completionRate.toFixed(1)}%`,
      icon: TrendingUp,
      gradient: "from-orange-500 to-orange-600",
      textColor: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8 mb-12"
    >
      {/* Header */}
      <div className="flex items-center space-x-4">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg"
        >
          <BarChart3 className="w-5 h-5 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Performance Analytics
        </h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            {/* Glow effect */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-500`}></div>
            
            <div className={`relative ${stat.bgColor} backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl shadow-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <motion.p 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className={`text-4xl font-bold ${stat.textColor} mt-3`}
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`p-5 rounded-2xl bg-gradient-to-r ${stat.gradient} shadow-xl`}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      {categoryData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/80 backdrop-blur-2xl rounded-3xl border border-slate-200/50 dark:border-gray-700/50 shadow-xl"></div>
            <div className="relative p-10">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3"></div>
                Challenges by Category
              </h3>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.3)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 13, fontWeight: 500 }}
                    stroke="rgb(100, 116, 139)"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 13, fontWeight: 500 }}
                    stroke="rgb(100, 116, 139)"
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.98)',
                      border: 'none',
                      borderRadius: '16px',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '500',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                      backdropFilter: 'blur(16px)',
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="url(#colorGradient)"
                    radius={[8, 8, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.9} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/80 backdrop-blur-2xl rounded-3xl border border-slate-200/50 dark:border-gray-700/50 shadow-xl"></div>
            <div className="relative p-10">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full mr-3"></div>
                Category Distribution
              </h3>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => {
                      return `${name} ${(percent * 100).toFixed(0)}%`;
                    }}
                    tick={{ 
                      fontSize: 12, 
                      fontWeight: 600,
                      fill: 'rgb(100, 116, 139)'
                    }}
                    outerRadius={100}
                    innerRadius={30}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth={2}
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
                      backgroundColor: 'rgba(15, 23, 42, 0.98)',
                      border: 'none',
                      borderRadius: '16px',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '500',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                      backdropFilter: 'blur(16px)',
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}