import React from "react";
import { motion } from "framer-motion";
import { Search, Filter, SortAsc, SortDesc, Sliders, Tag, X } from "lucide-react";
import { FilterState } from "../types/Challenge";

interface FilterControlsProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: string[];
  allTags: string[];
}

export function FilterControls({
  filters,
  onFilterChange,
  categories,
  allTags,
}: FilterControlsProps) {
  const statuses = ["all", "active", "pending", "completed"];
  const difficulties = ["all", "easy", "medium", "hard"];
  const priorities = ["all", "low", "medium", "high"];
  const sortOptions = [
    { value: "startDate", label: "Start Date" },
    { value: "endDate", label: "End Date" },
    { value: "status", label: "Status" },
    { value: "title", label: "Title" },
    { value: "difficulty", label: "Difficulty" },
    { value: "priority", label: "Priority" },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, status: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, category: e.target.value });
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, difficulty: e.target.value });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, priority: e.target.value });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag) 
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    onFilterChange({ ...filters, tags: newTags });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, sortBy: e.target.value as any });
  };

  const toggleSortOrder = () => {
    onFilterChange({
      ...filters,
      sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-10"
    >
      {/* Background with blur effect */}
      <div className="absolute inset-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50"></div>
      
      <div className="relative p-8">
        <div className="flex items-center space-x-2 mb-6">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Sliders className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Filter & Sort
          </h2>
        </div>

        <div className="space-y-6">
          {/* First Row - Search and Main Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Search */}
            <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              <Search className="w-4 h-4 inline mr-2" />
              Search Challenges
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.search}
                onChange={handleSearchChange}
                placeholder="Search by title, description, or tags..."
                className="w-full px-4 py-3 pl-11 border border-slate-300/50 dark:border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 bg-white/80 dark:bg-slate-700/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 transition-all duration-200 backdrop-blur-sm"
              />
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              <Filter className="w-4 h-4 inline mr-2" />
              Status
            </label>
            <select
              value={filters.status}
              onChange={handleStatusChange}
              className="w-full px-4 py-3 border border-slate-300/50 dark:border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 bg-white/80 dark:bg-slate-700/80 text-slate-900 dark:text-slate-100 transition-all duration-200 backdrop-blur-sm"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "all"
                    ? "All Statuses"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Category
            </label>
            <select
              value={filters.category}
              onChange={handleCategoryChange}
              className="w-full px-4 py-3 border border-slate-300/50 dark:border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 bg-white/80 dark:bg-slate-700/80 text-slate-900 dark:text-slate-100 transition-all duration-200 backdrop-blur-sm"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Difficulty
            </label>
            <select
              value={filters.difficulty}
              onChange={handleDifficultyChange}
              className="w-full px-4 py-3 border border-slate-300/50 dark:border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 bg-white/80 dark:bg-slate-700/80 text-slate-900 dark:text-slate-100 transition-all duration-200 backdrop-blur-sm"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === "all"
                    ? "All Levels"
                    : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Priority
            </label>
            <select
              value={filters.priority}
              onChange={handlePriorityChange}
              className="w-full px-4 py-3 border border-slate-300/50 dark:border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 bg-white/80 dark:bg-slate-700/80 text-slate-900 dark:text-slate-100 transition-all duration-200 backdrop-blur-sm"
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority === "all"
                    ? "All Priorities"
                    : priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Sort By
            </label>
            <div className="flex space-x-2">
              <select
                value={filters.sortBy}
                onChange={handleSortChange}
                className="flex-1 px-4 py-3 border border-slate-300/50 dark:border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 bg-white/80 dark:bg-slate-700/80 text-slate-900 dark:text-slate-100 transition-all duration-200 backdrop-blur-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSortOrder}
                className="px-4 py-3 border border-slate-300/50 dark:border-slate-600/50 rounded-xl hover:bg-slate-50/80 dark:hover:bg-slate-600/80 transition-all duration-200 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm"
              >
                {filters.sortOrder === "asc" ? (
                  <SortAsc className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                ) : (
                  <SortDesc className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                )}
              </motion.button>
            </div>
          </div>
          </div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                <Tag className="w-4 h-4 inline mr-2" />
                Filter by Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <motion.button
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      filters.tags.includes(tag)
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {tag}
                    {filters.tags.includes(tag) && (
                      <X className="w-3 h-3 inline ml-1" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}