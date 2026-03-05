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

  const handleCategoryChange = (category: string) => {
    onCategoryChange(category);
    setIsExpanded(false); // Fecha o filtro quando uma categoria é selecionada
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 space-y-4">
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
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none placeholder-gray-400 text-gray-900"
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

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 min-h-[40px] px-3 py-2.5 rounded-lg border border-primary-100 bg-gradient-to-r from-primary-50 to-beige-50 text-left text-sm font-medium text-gray-700 hover:border-primary-200 hover:from-primary-100 hover:to-beige-100 transition-all duration-200"
          aria-expanded={isExpanded}
        >
          <svg
            className="h-4 w-4 text-primary-600 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2.586a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Filtrar por categoria</span>
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary-100 text-primary-700 border border-primary-200 shrink-0">
            {selectedCategory ? categories[selectedCategory] : "Todos"}
          </span>
          <svg
            className={`h-4 w-4 text-gray-500 shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
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
        </button>

        <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-primary-50 border border-primary-100 text-gray-700 shrink-0">
          {filteredCount === totalSweets ? `${totalSweets} doces` : `${filteredCount} de ${totalSweets} doces`}
        </span>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className={`overflow-hidden min-h-0 ${isExpanded ? "border-t border-gray-100" : ""}`}>
          <div className="pt-4 space-y-3 max-h-[40vh] md:max-h-none overflow-y-auto overscroll-contain -mx-1 px-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide sticky top-0 bg-white py-0.5 z-10">Categorias</p>
            <div className="flex flex-wrap gap-2 pb-1">
              <button
                type="button"
                onClick={() => handleCategoryChange("")}
                className={`inline-flex items-center gap-1.5 min-h-[40px] px-3 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === ""
                    ? "bg-primary-500 text-white shadow-md border border-primary-600"
                    : "border border-gray-200 bg-gray-50 text-gray-700 hover:border-primary-200 hover:bg-primary-50"
                }`}
              >
                {selectedCategory === "" && (
                  <svg className="h-4 w-4 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                Todos
              </button>
              {categoryKeys.map((key) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => handleCategoryChange(key)}
                  className={`inline-flex items-center gap-1.5 min-h-[40px] px-3 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === key
                      ? "bg-primary-500 text-white shadow-md border border-primary-600"
                      : "border border-gray-200 bg-gray-50 text-gray-700 hover:border-primary-200 hover:bg-primary-50"
                  }`}
                >
                  {selectedCategory === key && (
                    <svg className="h-4 w-4 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {categories[key]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
