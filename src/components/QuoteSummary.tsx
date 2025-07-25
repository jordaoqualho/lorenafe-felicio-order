"use client";

import { Sweet } from "@/data/sweets";
import { useEffect, useState } from "react";

interface SelectedItem {
  sweet: Sweet;
  quantity: number;
}

interface QuoteSummaryProps {
  selectedItems: SelectedItem[];
}

export default function QuoteSummary({ selectedItems }: QuoteSummaryProps) {
  const [deliveryDate, setDeliveryDate] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<Set<string>>(new Set());

  const total = selectedItems.reduce((sum, item) => sum + item.sweet.price * item.quantity, 0);

  // Animate new items when they're added
  useEffect(() => {
    const newItems = new Set<string>();
    selectedItems.forEach((item) => {
      if (!animatedItems.has(item.sweet.id)) {
        newItems.add(item.sweet.id);
      }
    });

    if (newItems.size > 0) {
      setAnimatedItems((prev) => new Set([...Array.from(prev), ...Array.from(newItems)]));

      // Clear animation state after animation completes
      setTimeout(() => {
        setAnimatedItems(new Set());
      }, 500);
    }
  }, [selectedItems, animatedItems]);

  const generateWhatsAppMessage = () => {
    if (selectedItems.length === 0) return "";

    const itemsList = selectedItems
      .map(
        (item) =>
          `• ${item.sweet.name} - Qtd: ${item.quantity} - R$ ${(item.sweet.price * item.quantity)
            .toFixed(2)
            .replace(".", ",")}`
      )
      .join("\n");

    const dateText = deliveryDate ? ` para o dia ${new Date(deliveryDate).toLocaleDateString("pt-BR")}` : "";

    return `Olá! Gostaria de solicitar um orçamento para os seguintes doces:\n\n${itemsList}\n\nTotal: R$ ${total
      .toFixed(2)
      .replace(".", ",")}${dateText}.\n\nObrigado(a)!`;
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
            className={`flex justify-between items-center py-2 px-3 rounded-lg border-b border-beige-200 last:border-b-0 hover:bg-white/50 transition-all duration-200 ${
              animatedItems.has(item.sweet.id) ? "animate-bounce-subtle bg-primary-50" : ""
            }`}
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
        />
      </div>

      <div className="space-y-2 md:space-y-3 pt-4">
        <button
          onClick={openWhatsApp}
          className="w-full btn-primary flex items-center justify-center space-x-2 text-sm md:text-base"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
          <span>Enviar para WhatsApp</span>
        </button>

        <button
          onClick={copyToClipboard}
          className="w-full btn-secondary relative flex items-center justify-center space-x-2 text-sm md:text-base"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
            <path d="M3 5a2 2 0 012-2 3 3 0 003 3h6a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L14.586 13H19v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11.586V9H9v2.586l1.293-1.293a1 1 0 011.414 1.414L9 14.414V17h6v-2.586l-2.707-2.707a1 1 0 011.414-1.414L15 11.586z" />
          </svg>
          <span>{copySuccess ? "Copiado!" : "Copiar Mensagem"}</span>
        </button>
      </div>
    </div>
  );
}
