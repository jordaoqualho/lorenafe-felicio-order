"use client";

import { categories } from "@/data/sweets";
import { useState } from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  totalSweets: number;
  filteredCount: number;
}

export default function SearchBar({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  totalSweets,
  filteredCount,
}: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryKeys = Object.keys(categories);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Buscar doce por nome..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 text-gray-900"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label="Limpar busca"
          >
            <svg
              className="h-5 w-5 text-gray-400 hover:text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Category Filter Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
        >
          <svg
            className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span>Filtrar por categoria</span>
        </button>

        <div className="text-sm text-gray-500">
          {filteredCount === totalSweets ? `${totalSweets} doces` : `${filteredCount} de ${totalSweets} doces`}
        </div>
      </div>

      {/* Category Filter Options */}
      {isExpanded && (
        <div className="space-y-2 border-t border-gray-100 pt-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onCategoryChange("")}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "" ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todos
            </button>
            {categoryKeys.map((key) => (
              <button
                key={key}
                onClick={() => onCategoryChange(key)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === key ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {categories[key]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
