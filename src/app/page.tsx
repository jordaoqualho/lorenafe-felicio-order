"use client";

import MobileStickyBar from "@/components/MobileStickyBar";
import QuoteSummary from "@/components/QuoteSummary";
import SearchBar from "@/components/SearchBar";
import SweetItem from "@/components/SweetItem";
import { categories, sweets } from "@/data/sweets";
import { useMemo, useRef, useState } from "react";

export default function Home() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const quoteSummaryRef = useRef<HTMLDivElement>(null);

  const handleQuantityChange = (id: string, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: quantity,
    }));
  };

  // Filter sweets based on search term and category
  const filteredSweets = useMemo(() => {
    return sweets.filter((sweet) => {
      const matchesSearch = sweet.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "" || sweet.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Group filtered sweets by category
  const groupedSweets = useMemo(() => {
    const grouped: Record<string, typeof sweets> = {};
    filteredSweets.forEach((sweet) => {
      if (!grouped[sweet.category]) {
        grouped[sweet.category] = [];
      }
      grouped[sweet.category].push(sweet);
    });
    return grouped;
  }, [filteredSweets]);

  const selectedItems = sweets
    .filter((sweet) => quantities[sweet.id] > 0)
    .map((sweet) => ({
      sweet,
      quantity: quantities[sweet.id],
    }));

  const handleViewQuote = () => {
    if (quoteSummaryRef.current) {
      quoteSummaryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const categoryKeys = Object.keys(groupedSweets);
  const showGrouped = selectedCategory === "" && searchTerm === "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 to-primary-50">
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        <header className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Lorena Felício</h1>
          <p className="text-base md:text-lg text-gray-600 mb-4">Doces & Sobremesas Artesanais</p>
          <div className="h-1 w-16 md:w-24 bg-gradient-to-r from-primary-400 to-beige-400 mx-auto rounded-full"></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-4">Nossos Doces</h2>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                Selecione a quantidade desejada de cada doce para gerar seu orçamento
              </p>

              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                totalSweets={sweets.length}
                filteredCount={filteredSweets.length}
              />
            </div>

            {/* Sweets Grid */}
            {filteredSweets.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">Nenhum doce encontrado</p>
                <p className="text-gray-400 text-sm mt-2">Tente ajustar sua busca ou filtros</p>
              </div>
            ) : showGrouped ? (
              // Grouped by category
              <div className="space-y-8">
                {categoryKeys.map((categoryKey) => (
                  <div key={categoryKey} className="animate-fadeIn">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="h-2 w-2 bg-primary-400 rounded-full mr-3"></span>
                      {categories[categoryKey]}
                      <span className="ml-2 text-sm font-normal text-gray-500">
                        ({groupedSweets[categoryKey].length} itens)
                      </span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      {groupedSweets[categoryKey].map((sweet) => (
                        <div key={sweet.id} className="animate-slideIn">
                          <SweetItem
                            sweet={sweet}
                            quantity={quantities[sweet.id] || 0}
                            onQuantityChange={handleQuantityChange}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Flat grid when searching or filtering
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {filteredSweets.map((sweet) => (
                  <div key={sweet.id} className="animate-slideIn">
                    <SweetItem
                      sweet={sweet}
                      quantity={quantities[sweet.id] || 0}
                      onQuantityChange={handleQuantityChange}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Quote Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6" ref={quoteSummaryRef}>
              <QuoteSummary selectedItems={selectedItems} />
            </div>
          </div>
        </div>

        <footer className="mt-12 md:mt-16 text-center">
          <div className="h-1 w-16 md:w-24 bg-gradient-to-r from-primary-400 to-beige-400 mx-auto rounded-full mb-4"></div>
          <p className="text-xs md:text-sm text-gray-500">Feito com ❤️ para os doces momentos da vida</p>
        </footer>
      </div>

      {/* Mobile Sticky Bar */}
      <MobileStickyBar selectedItems={selectedItems} onViewQuote={handleViewQuote} />
    </div>
  );
}
