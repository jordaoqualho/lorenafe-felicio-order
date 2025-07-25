"use client";

import { Sweet } from "@/data/sweets";
import { useState } from "react";

interface SelectedItem {
  sweet: Sweet;
  quantity: number;
}

interface QuoteSummaryProps {
  selectedItems: SelectedItem[];
  onClearOrder?: () => void;
}

export default function QuoteSummary({ selectedItems, onClearOrder }: QuoteSummaryProps) {
  const [deliveryDate, setDeliveryDate] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const total = selectedItems.reduce((sum, item) => sum + item.sweet.price * item.quantity, 0);

  const generateWhatsAppMessage = () => {
    if (selectedItems.length === 0) return "";

    const itemsList = selectedItems
      .map(
        (item) =>
          `• ${item.quantity} ${item.sweet.name} – R$ ${(item.sweet.price * item.quantity)
            .toFixed(2)
            .replace(".", ",")}`
      )
      .join("\n");

    const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalValue = total.toFixed(2).replace(".", ",");
    const dateText = deliveryDate
      ? `Data do evento/entrega: ${new Date(deliveryDate).toLocaleDateString("pt-BR")}`
      : "";

    return (
      `Olá! Segue o orçamento do meu pedido:\n\n` +
      itemsList +
      `\n\nTotal de itens: ${totalQuantity}` +
      `\nValor total: R$ ${totalValue}` +
      (dateText ? `\n${dateText}` : "") +
      `\n\nFico no aguardo da confirmação. \nObrigada!`
    );
  };

  const copyToClipboard = async () => {
    const message = generateWhatsAppMessage();
    if (!message) return;

    try {
      await navigator.clipboard.writeText(message);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  const openWhatsApp = () => {
    const message = generateWhatsAppMessage();
    if (!message) return;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleClearOrder = () => {
    if (onClearOrder) {
      onClearOrder();
      setDeliveryDate("");
    }
    setShowClearConfirm(false);
  };

  if (selectedItems.length === 0) {
    return (
      <div className="bg-beige-50 border border-beige-200 rounded-xl p-4 md:p-6">
        <div className="text-center py-4 md:py-8">
          <div className="text-beige-300 mb-4">
            <svg
              className="mx-auto h-12 w-12 md:h-16 md:w-16"
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
                d="M16 11V7a4 4 0 00-8 0v4M8 11v6a2 2 0 002 2h4a2 2 0 002-2v-6M8 11h8"
              />
            </svg>
          </div>
          <p className="text-gray-600 text-sm md:text-base">Selecione alguns doces para gerar seu orçamento</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-beige-50 border border-beige-200 rounded-xl p-4 md:p-6 space-y-4 md:space-y-6 animate-slideUp">
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

      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-bold text-gray-800">Resumo do Pedido</h2>
        <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {selectedItems.length} {selectedItems.length === 1 ? "item" : "itens"}
        </div>
      </div>

      <div className="space-y-2 md:space-y-3 max-h-64 md:max-h-80 overflow-y-auto">
        {selectedItems.map((item) => (
          <div
            key={item.sweet.id}
            className="flex justify-between items-center py-2 px-3 rounded-lg border-b border-beige-200 last:border-b-0 hover:bg-white/50 transition-all duration-200"
          >
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-800 text-sm md:text-base truncate">{item.sweet.name}</div>
              <div className="text-xs text-gray-600 flex items-center space-x-2">
                <span>Qtd: {item.quantity}</span>
                <span>•</span>
                <span>R$ {item.sweet.price.toFixed(2).replace(".", ",")}</span>
              </div>
            </div>
            <div className="flex-shrink-0 ml-2">
              <span className="font-semibold text-gray-800 text-sm md:text-base">
                R$ {(item.sweet.price * item.quantity).toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-beige-300 pt-4">
        <div className="flex justify-between items-center bg-white/50 p-3 rounded-lg">
          <span className="text-base md:text-lg font-bold text-gray-800">Total:</span>
          <span className="text-xl md:text-2xl font-bold text-primary-600">
            R$ {total.toFixed(2).replace(".", ",")}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700">
          Data do evento/entrega (opcional):
        </label>
        <input
          type="date"
          id="deliveryDate"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          className="w-full px-3 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm md:text-base"
          aria-label="Data de entrega do pedido"
        />
      </div>

      <div className="space-y-2 md:space-y-3 pt-4">
        <button
          onClick={openWhatsApp}
          className="w-full btn-primary flex items-center justify-center space-x-2 text-sm md:text-base"
          aria-label="Enviar pedido para WhatsApp"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
          <span>Enviar para WhatsApp</span>
        </button>

        <div className="flex space-x-2">
          <button
            onClick={copyToClipboard}
            className="flex-1 btn-secondary relative flex items-center justify-center space-x-2 text-sm md:text-base"
            aria-label="Copiar mensagem do pedido"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
              <path d="M3 5a2 2 0 012-2 3 3 0 003 3h6a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L14.586 13H19v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11.586V9H9v2.586l1.293-1.293a1 1 0 011.414 1.414L9 14.414V17h6v-2.586l-2.707-2.707a1 1 0 011.414-1.414L15 11.586z" />
            </svg>
            <span>{copySuccess ? "Copiado!" : "Copiar"}</span>
          </button>

          {onClearOrder && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="px-4 py-2 md:py-3 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 flex items-center space-x-2 text-sm md:text-base border border-gray-200 hover:border-red-200"
              aria-label="Limpar pedido completo"
              title="Limpar pedido"
            >
              <span className="text-base">🗑️</span>
              <span className="hidden sm:inline">Limpar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
