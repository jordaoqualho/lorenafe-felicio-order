"use client";

import { Sweet, categories } from "@/data/sweets";
import { useRef, useState } from "react";

interface SweetItemProps {
  sweet: Sweet;
  quantity: number;
  onQuantityChange: (id: string, quantity: number) => void;
}

export default function SweetItem({ sweet, quantity, onQuantityChange }: SweetItemProps) {
  const [showBulkInput, setShowBulkInput] = useState(false);
  const [bulkValue, setBulkValue] = useState(quantity.toString());
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const [isLongPressing, setIsLongPressing] = useState(false);

  const handleIncrease = () => {
    onQuantityChange(sweet.id, quantity + 1);
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

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 relative">
      {showBulkInput && (
        <div className="absolute inset-0 bg-white bg-opacity-95 rounded-xl flex items-center justify-center z-10 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg border max-w-xs w-full mx-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">{sweet.name}</h4>
            <label htmlFor={`bulk-${sweet.id}`} className="block text-sm font-medium text-gray-700 mb-2">
              Quantidade desejada:
            </label>
            <input
              id={`bulk-${sweet.id}`}
              type="number"
              min="0"
              value={bulkValue}
              onChange={(e) => setBulkValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-center text-lg"
              autoFocus
            />
            <div className="flex space-x-2 mt-4">
              <button
                onClick={handleBulkCancel}
                className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleBulkSubmit}
                className="flex-1 px-4 py-2 text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 leading-tight pr-2">{sweet.name}</h3>
            <span className="text-xs px-2 py-1 bg-beige-100 text-beige-800 rounded-full whitespace-nowrap">
              {categories[sweet.category]}
            </span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-primary-600">
            R$ {sweet.price.toFixed(2).replace(".", ",")}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">Quantidade:</span>
          <div className="flex items-center space-x-2 md:space-x-3">
            <button
              onClick={handleDecrease}
              disabled={quantity === 0}
              className="quantity-btn disabled:opacity-50 disabled:cursor-not-allowed w-8 h-8 md:w-10 md:h-10 text-sm md:text-base"
              aria-label="Diminuir quantidade"
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
              className={`text-lg md:text-xl font-semibold text-gray-800 min-w-[3rem] md:min-w-[3.5rem] text-center py-2 px-3 rounded-lg transition-all duration-200 bg-primary-50 hover:bg-primary-100 cursor-pointer border border-primary-200
                ${isLongPressing ? "bg-primary-100 scale-95" : ""}
              `}
              title="Clique para editar quantidade"
            >
              {quantity}
            </button>
            <button
              onClick={handleIncrease}
              className="quantity-btn w-8 h-8 md:w-10 md:h-10 text-sm md:text-base"
              aria-label="Aumentar quantidade"
            >
              +
            </button>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center">💡 Clique na quantidade para editar rapidamente</div>
      </div>
    </div>
  );
}
