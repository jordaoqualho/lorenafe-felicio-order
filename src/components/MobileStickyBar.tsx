"use client";

import { Sweet } from "@/data/sweets";

interface SelectedItem {
  sweet: Sweet;
  quantity: number;
}

interface MobileStickyBarProps {
  selectedItems: SelectedItem[];
  onViewQuote: () => void;
}

export default function MobileStickyBar({ selectedItems, onViewQuote }: MobileStickyBarProps) {
  const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.sweet.price * item.quantity, 0);

  // Don't show the bar if no items are selected
  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <>
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
                >
                  <span>Ver Pedido</span>
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
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
