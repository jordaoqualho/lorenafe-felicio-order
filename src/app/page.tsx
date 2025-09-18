"use client";

import InstallPrompt from "@/components/InstallPrompt";
import MobileStickyBar from "@/components/MobileStickyBar";
import QuoteSummary from "@/components/QuoteSummary";
import SearchBar from "@/components/SearchBar";
import SweetItem from "@/components/SweetItem";
import { categories, sweets } from "@/data/sweets";
import { useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "lorena-felicio-order";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Voltar ao topo"
      title="Back to Top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-24 right-4 z-50 bg-white border border-gray-200 shadow-lg rounded-full p-3 text-primary-600 hover:bg-primary-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2
        ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
    >
      <span className="text-2xl">↑</span>
    </button>
  );
}

export default function Home() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const quoteSummaryRef = useRef<HTMLDivElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    try {
      const savedOrder = localStorage.getItem(STORAGE_KEY);
      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder);
        if (parsedOrder && typeof parsedOrder === "object") {
          setQuantities(parsedOrder.quantities || {});
          setDeliveryDate(parsedOrder.deliveryDate || "");
        }
      }
    } catch (error) {
      console.warn("Erro ao carregar pedido salvo:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    try {
      const hasItems = Object.values(quantities).some((qty) => qty > 0);
      const orderData = {
        quantities,
        deliveryDate,
      };

      if (hasItems || deliveryDate) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orderData));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }

      saveTimeoutRef.current = setTimeout(() => {
        // Debounce completed
      }, 500);
    } catch (error) {
      console.warn("Erro ao salvar pedido:", error);
    }
  }, [quantities, deliveryDate, isLoaded]);

  const handleQuantityChange = (id: string, quantity: number) => {
    // Validate quantity to prevent negative values or extremely large numbers
    const validQuantity = Math.max(0, Math.min(quantity, 999));
    setQuantities((prev) => ({
      ...prev,
      [id]: validQuantity,
    }));
  };

  const handleDeliveryDateChange = (date: string) => {
    // Validate date to prevent past dates
    if (date) {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of day
      
      if (selectedDate < today) {
        console.warn("Data de entrega não pode ser no passado");
        return;
      }
    }
    setDeliveryDate(date);
  };

  const handleClearOrder = () => {
    setQuantities({});
    setDeliveryDate("");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn("Erro ao limpar pedido:", error);
    }
  };

  const filteredSweets = useMemo(() => {
    return sweets.filter((sweet) => {
      const matchesSearch = sweet.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "" || sweet.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

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

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-beige-50 to-primary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 to-primary-50">
      <ScrollToTopButton />
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        <header className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Lorena Felicio Confeitaria</h1>
          <p className="text-base md:text-lg text-gray-600 mb-4">Doces & Sobremesas Artesanais</p>
          <div className="h-1 w-16 md:w-24 bg-gradient-to-r from-primary-400 to-beige-400 mx-auto rounded-full"></div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="mb-2">
              <p className="text-sm md:text-base text-gray-600">
                Selecione a quantidade desejada de cada doce para gerar seu orçamento
              </p>
            </div>
            <div className="sticky top-0 z-30 px-2 py-1 md:px-0 md:py-2 transition-all duration-300">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                totalSweets={sweets.length}
                filteredCount={filteredSweets.length}
              />
            </div>

            {filteredSweets.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
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
              <div className="space-y-8">
                {categoryKeys.map((categoryKey) => (
                  <div key={categoryKey} className="animate-fadeIn">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center bg-gradient-to-r from-primary-50 to-beige-50 p-3 rounded-lg border border-primary-100">
                      <span className="h-3 w-3 bg-primary-500 rounded-full mr-3 shadow-sm"></span>
                      <span className="text-gray-800">{categories[categoryKey]}</span>
                      <span className="ml-auto text-sm font-normal text-gray-500 bg-white px-2 py-1 rounded-full">
                        {groupedSweets[categoryKey].length} itens
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

          <div className="lg:col-span-1">
            <div className="sticky top-6" ref={quoteSummaryRef}>
              <QuoteSummary
                selectedItems={selectedItems}
                onClearOrder={handleClearOrder}
                onQuantityChange={handleQuantityChange}
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 md:py-8 text-center">
        <div className="h-1 w-16 md:w-24 bg-gradient-to-r from-primary-400 to-beige-400 mx-auto rounded-full mb-4"></div>
        <p className="text-xs md:text-sm text-gray-500 mb-2">Feito com ❤️ para os doces momentos da vida</p>
        <p className="text-xs text-gray-400">
          Desenvolvido por{" "}
          <a
            href="https://www.linkedin.com/in/jordao-silva/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-500 transition-colors duration-200 underline"
          >
            Jordão Silva
          </a>
        </p>
      </footer>
      <MobileStickyBar selectedItems={selectedItems} onViewQuote={handleViewQuote} onClearOrder={handleClearOrder} />
      <InstallPrompt />
    </div>
  );
}
