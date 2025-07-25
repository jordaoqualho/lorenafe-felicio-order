"use client";

import { Sweet } from "@/data/sweets";
import { useState } from "react";

interface SelectedItem {
  sweet: Sweet;
  quantity: number;
}

interface MobileStickyBarProps {
  selectedItems: SelectedItem[];
  onViewQuote: () => void;
  onClearOrder?: () => void;
}

export default function MobileStickyBar({ selectedItems, onViewQuote, onClearOrder }: MobileStickyBarProps) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.sweet.price * item.quantity, 0);

  const handleClearOrder = () => {
    if (onClearOrder) {
      onClearOrder();
    }
    setShowClearConfirm(false);
  };

  // Don't show the bar if no items are selected
  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <>
      {/* Clear Order Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
            <div className="flex items-center mb-4">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Limpar pedido?</h3>
              <p className="text-sm text-gray-500 mb-6">
                Esta ação irá remover todos os doces do seu pedido. Esta ação não pode ser desfeita.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
                  aria-label="Cancelar limpeza do pedido"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleClearOrder}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  aria-label="Confirmar limpeza do pedido"
                >
                  Limpar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to prevent content from being hidden behind the fixed bar */}
      <div className="h-20 lg:hidden" />

      {/* Fixed Bottom Bar - Only visible on mobile/tablet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Left side - Totals */}
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 font-medium">Itens</div>
                    <div className="text-lg font-bold text-gray-800">{totalQuantity}</div>
                  </div>
                  <div className="h-8 w-px bg-gray-300"></div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 font-medium">Total</div>
                    <div className="text-lg font-bold text-primary-600">
                      R$ {totalPrice.toFixed(2).replace(".", ",")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - CTA Button */}
              <div className="flex-shrink-0 ml-4">
                <button
                  onClick={onViewQuote}
                  className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 flex items-center space-x-2"
                  aria-label="Ver resumo do pedido"
                >
                  <span>Ver Pedido</span>
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
