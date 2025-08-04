"use client";

import { Sweet, categories } from "@/data/sweets";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface SweetItemProps {
  sweet: Sweet;
  quantity: number;
  onQuantityChange: (id: string, quantity: number) => void;
}

export default function SweetItem({ sweet, quantity, onQuantityChange }: SweetItemProps) {
  const [showBulkInput, setShowBulkInput] = useState(false);
  const [bulkValue, setBulkValue] = useState(quantity.toString());
  const [addClickCount, setAddClickCount] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const tipTimer = useRef<NodeJS.Timeout | null>(null);
  const highlightTimer = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const [isLongPressing, setIsLongPressing] = useState(false);

  // Hide tip after 4 seconds when it appears
  useEffect(() => {
    if (showTip) {
      tipTimer.current = setTimeout(() => {
        setShowTip(false);
      }, 4000);
    }
    return () => {
      if (tipTimer.current) {
        clearTimeout(tipTimer.current);
      }
    };
  }, [showTip]);

  // Auto-close modal after 8 seconds of inactivity
  useEffect(() => {
    if (showBulkInput) {
      const resetTimer = () => {
        if (inactivityTimer.current) {
          clearTimeout(inactivityTimer.current);
        }
        inactivityTimer.current = setTimeout(() => {
          setShowBulkInput(false);
        }, 8000);
      };

      resetTimer(); // Start initial timer

      return () => {
        if (inactivityTimer.current) {
          clearTimeout(inactivityTimer.current);
        }
      };
    }
  }, [showBulkInput]);

  // Reset inactivity timer on user interaction
  const resetInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    if (showBulkInput) {
      inactivityTimer.current = setTimeout(() => {
        setShowBulkInput(false);
      }, 8000);
    }
  };

  // Reset click count when quantity reaches 0
  useEffect(() => {
    if (quantity === 0) {
      setAddClickCount(0);
      setShowTip(false);
    }
  }, [quantity]);

  // Highlight effect when quantity changes
  useEffect(() => {
    if (quantity > 0) {
      setIsHighlighted(true);

      if (highlightTimer.current) {
        clearTimeout(highlightTimer.current);
      }

      highlightTimer.current = setTimeout(() => {
        setIsHighlighted(false);
      }, 1500);
    }

    return () => {
      if (highlightTimer.current) {
        clearTimeout(highlightTimer.current);
      }
    };
  }, [quantity]);

  const handleIncrease = () => {
    onQuantityChange(sweet.id, quantity + 1);

    // Count clicks and show tip after 5 clicks
    const newClickCount = addClickCount + 1;
    setAddClickCount(newClickCount);

    if (newClickCount >= 5 && !showTip) {
      setShowTip(true);
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      onQuantityChange(sweet.id, quantity - 1);
    }
  };

  const handleLongPressStart = () => {
    setIsLongPressing(true);
    longPressTimer.current = setTimeout(() => {
      setShowBulkInput(true);
      setBulkValue(quantity.toString());
    }, 500);
  };

  const handleLongPressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    setIsLongPressing(false);
  };

  const handleQuantityClick = () => {
    setShowBulkInput(true);
    setBulkValue(quantity.toString());
  };

  const handleBulkSubmit = () => {
    const newQuantity = Math.max(0, parseInt(bulkValue) || 0);
    onQuantityChange(sweet.id, newQuantity);
    setShowBulkInput(false);
  };

  const handleBulkCancel = () => {
    setShowBulkInput(false);
    setBulkValue(quantity.toString());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBulkSubmit();
    } else if (e.key === "Escape") {
      handleBulkCancel();
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md overflow-hidden
        ${isHighlighted ? "border-yellow-300 bg-yellow-50 shadow-md" : "border-gray-100"}
        ${quantity > 0 ? "ring-1 ring-primary-100" : ""}
      `}
      role="article"
      aria-labelledby={`sweet-${sweet.id}-name`}
    >
      {showBulkInput && (
        <div
          className="absolute inset-0 bg-white bg-opacity-95 rounded-xl flex items-center justify-center z-[9999] backdrop-blur-sm"
          onClick={() => setShowBulkInput(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg border max-w-xs w-full mx-4"
            onClick={(e) => {
              e.stopPropagation();
              resetInactivityTimer();
            }}
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">{sweet.name}</h4>
            <label htmlFor={`bulk-${sweet.id}`} className="block text-sm font-medium text-gray-700 mb-2">
              Quantidade desejada:
            </label>
            <input
              id={`bulk-${sweet.id}`}
              type="number"
              min="0"
              value={bulkValue}
              onChange={(e) => {
                setBulkValue(e.target.value);
                resetInactivityTimer();
              }}
              onKeyDown={(e) => {
                handleKeyPress(e);
                resetInactivityTimer();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-center text-lg"
              autoFocus
              aria-label={`Editar quantidade de ${sweet.name}`}
            />
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => {
                  handleBulkCancel();
                  resetInactivityTimer();
                }}
                className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                aria-label="Cancelar edição de quantidade"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  handleBulkSubmit();
                  resetInactivityTimer();
                }}
                className="flex-1 px-4 py-2 text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
                aria-label="Confirmar quantidade"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-full">
        {/* Image Section */}
        <div className="relative h-48 bg-gradient-to-br from-primary-50 to-beige-50 overflow-hidden">
          {sweet.image && !imageError ? (
            <Image
              src={sweet.image}
              alt={sweet.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              onError={handleImageError}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-primary-200 to-beige-200 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-500 font-medium">Imagem não disponível</p>
              </div>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <span
              className="text-xs px-2 py-1 bg-white/90 backdrop-blur-sm text-beige-800 rounded-full whitespace-nowrap font-medium shadow-sm"
              aria-label={`Categoria: ${categories[sweet.category]}`}
            >
              {categories[sweet.category]}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 md:p-6 flex flex-col flex-1">
          <div className="flex-1">
            <h3
              id={`sweet-${sweet.id}-name`}
              className="text-base md:text-lg font-semibold text-gray-800 leading-tight mb-2"
            >
              {sweet.name}
            </h3>
            <p className="text-xl md:text-2xl font-bold text-primary-600 mb-4">
              R$ {sweet.price.toFixed(2).replace(".", ",")}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 font-medium">Quantidade:</span>
            <div className="flex items-center space-x-2 md:space-x-3">
              <button
                onClick={handleDecrease}
                disabled={quantity === 0}
                className="quantity-btn disabled:opacity-50 disabled:cursor-not-allowed w-10 h-10 md:w-12 md:h-12 text-base md:text-lg touch-manipulation"
                aria-label={`Diminuir quantidade de ${sweet.name}`}
              >
                −
              </button>
              <button
                onClick={handleQuantityClick}
                onTouchStart={handleLongPressStart}
                onTouchEnd={handleLongPressEnd}
                onMouseDown={handleLongPressStart}
                onMouseUp={handleLongPressEnd}
                onMouseLeave={handleLongPressEnd}
                className={`text-lg md:text-xl font-semibold text-gray-800 min-w-[3.5rem] md:min-w-[4rem] text-center py-3 px-3 rounded-lg transition-all duration-200 cursor-pointer touch-manipulation
                  ${
                    quantity > 0
                      ? "bg-primary-50 hover:bg-primary-100 border border-primary-200"
                      : "hover:bg-gray-50 border border-gray-200"
                  }
                  ${isLongPressing ? "bg-primary-100 scale-95" : ""}
                `}
                title="Clique para editar quantidade"
                aria-label={`Quantidade atual: ${quantity}. Clique para editar a quantidade de ${sweet.name}`}
              >
                {quantity}
              </button>
              <button
                onClick={handleIncrease}
                className="quantity-btn w-10 h-10 md:w-12 md:h-12 text-base md:text-lg touch-manipulation"
                aria-label={`Aumentar quantidade de ${sweet.name}`}
              >
                +
              </button>
            </div>
          </div>

          {showTip && (
            <div className="text-xs text-gray-500 text-center animate-fadeIn bg-primary-50 p-2 rounded-md border border-primary-200 mt-3">
              💡 Clique na quantidade para editar rapidamente
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
