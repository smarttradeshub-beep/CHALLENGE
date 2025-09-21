import React from "react";
import { motion } from "framer-motion";
import { Search, Filter, SortAsc, SortDesc, Sliders, Tag, X, ChevronDown, ChevronUp } from "lucide-react";
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
  const [isExpanded, setIsExpanded] = React.useState(false);
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
      transition={{ duration: 0.6 }}
      className="relative mb-10"
    >
      {/* Background with blur effect */}
      <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/80 backdrop-blur-2xl rounded-3xl border border-slate-200/50 dark:border-gray-700/50 shadow-xl dark:shadow-2xl"></div>
      
      <div className="relative p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg"
            >
            <Sliders className="w-5 h-5 text-white" />
            </motion.div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Filter & Sort
          </h2>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-100/80 dark:bg-gray-700/80 hover:bg-slate-200/80 dark:hover:bg-gray-600/80 rounded-xl transition-all duration-300 font-medium text-slate-700 dark:text-slate-300"
          >
            <span>{isExpanded ? 'Collapse' : 'Expand'} Filters</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </motion.button>
        </div>

        {/* Always visible search */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            <Search className="w-4 h-4 inline mr-2" />
            Search Challenges
          </label>
          <div className="relative">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              value={filters.search}
              onChange={handleSearchChange}
              placeholder="Search by title, description, or tags..."
              className="w-full px-4 py-3 pl-11 border border-slate-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 bg-white/90 dark:bg-gray-800/90 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-gray-400 transition-all duration-200 backdrop-blur-sm shadow-sm"
            />
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 dark:text-gray-400" />
          </div>
        </div>

        <motion.div 
          initial={false}
          animate={{ 
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="space-y-6 pt-2">
          {/* First Row - Search and Main Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              <Filter className="w-4 h-4 inline mr-2" />
              Status
            </label>
            <motion.select
              whileFocus={{ scale: 1.02 }}
              value={filters.status}
              onChange={handleStatusChange}
              className="w-full px-4 py-3 border border-slate-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 bg-white/90 dark:bg-gray-800/90 text-slate-900 dark:text-slate-100 transition-all duration-200 backdrop-blur-sm shadow-sm"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "all"
                    ? "All Statuses"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </motion.select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Category
            </label>
            <motion.select
              whileFocus={{ scale: 1.02 }}
              value={filters.category}
              onChange={handleCategoryChange}
              className="w-full px-4 py-3 border border-slate-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 bg-white/90 dark:bg-gray-800/90 text-slate-900 dark:text-slate-100 transition-all duration-200 backdrop-blur-sm shadow-sm"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </motion.select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Difficulty
            </label>
            <motion.select
              whileFocus={{ scale: 1.02 }}
              value={filters.difficulty}
              onChange={handleDifficultyChange}
              className="w-full px-4 py-3 border border-slate-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 bg-white/90 dark:bg-gray-800/90 text-slate-900 dark:text-slate-100 transition-all duration-200 backdrop-blur-sm shadow-sm"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === "all"
                    ? "All Levels"
                    : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </option>
              ))}
            </motion.select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Priority
            </label>
            <motion.select
              whileFocus={{ scale: 1.02 }}
              value={filters.priority}
              onChange={handlePriorityChange}
              className="w-full px-4 py-3 border border-slate-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 bg-white/90 dark:bg-gray-800/90 text-slate-900 dark:text-slate-100 transition-all duration-200 backdrop-blur-sm shadow-sm"
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority === "all"
                    ? "All Priorities"
                    : priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </motion.select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Sort By
            </label>
            <div className="flex space-x-2">
              <motion.select
                whileFocus={{ scale: 1.02 }}
                value={filters.sortBy}
                onChange={handleSortChange}
                className="flex-1 px-4 py-3 border border-slate-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 bg-white/90 dark:bg-gray-800/90 text-slate-900 dark:text-slate-100 transition-all duration-200 backdrop-blur-sm shadow-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </motion.select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSortOrder}
                className="px-4 py-3 border border-slate-300/50 dark:border-gray-600/50 rounded-xl hover:bg-slate-50/80 dark:hover:bg-gray-600/80 transition-all duration-200 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm"
              >
                {filters.sortOrder === "asc" ? (
                  <SortAsc className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                ) : (
                  <SortDesc className="w-4 h-4 text-slate-600 dark:text-slate-300" />
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
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-slate-700 dark:text-slate-300 shadow-sm'
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
        </motion.div>
      </div>
    </motion.div>
  );
}