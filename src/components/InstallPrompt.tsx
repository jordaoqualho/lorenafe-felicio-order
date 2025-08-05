"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface InstallPromptProps {
  onDismiss?: () => void;
}

export default function InstallPrompt({ onDismiss }: InstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDevelopment, setIsDevelopment] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop">("desktop");

  useEffect(() => {
    const checkPWASupport = () => {
      const isDev = process.env.NODE_ENV === "development";
      setIsDevelopment(isDev);

      const userAgent = navigator.userAgent.toLowerCase();
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const isAndroid = /android/.test(userAgent);
      const isMobileDevice = /mobile|android|iphone|ipad/.test(userAgent);

      setIsMobile(isMobileDevice);
      
      if (isIOS) {
        setPlatform("ios");
      } else if (isAndroid) {
        setPlatform("android");
      } else {
        setPlatform("desktop");
      }

      const dismissedPrompt = localStorage.getItem("pwa-prompt-dismissed");
      if (dismissedPrompt) {
        setDismissed(true);
        return;
      }

      if (isDev) {
        setTimeout(() => {
          setShowPrompt(true);
        }, 3000);
      }
    };

    checkPWASupport();
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    const handleAppInstalled = () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowPrompt(false);
        setDeferredPrompt(null);
      }
    } else if (isDevelopment) {
      alert("Em desenvolvimento: Simulação de instalação bem-sucedida!");
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDismissed(true);
    localStorage.setItem("pwa-prompt-dismissed", "true");
    if (onDismiss) onDismiss();
  };

  const handleShowInstructions = () => {
    setShowInstructions(true);
  };

  const handleCloseInstructions = () => {
    setShowInstructions(false);
  };

  if (dismissed || !showPrompt) return null;

  const renderInstructions = () => {
    if (platform === "ios") {
      return (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">📱 Como instalar no iPhone:</h4>
            <ol className="text-sm text-blue-700 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                <span>Toque no ícone <strong>Compartilhar</strong> (📤) na barra de navegação</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                <span>Role para baixo e toque em <strong>"Adicionar à Tela Inicial"</strong></span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                <span>Toque em <strong>"Adicionar"</strong> para confirmar</span>
              </li>
            </ol>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              <strong>💡 Dica:</strong> O app aparecerá na sua tela inicial como um ícone normal e funcionará offline!
            </p>
          </div>
        </div>
      );
    } else if (platform === "android") {
      return (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">📱 Como instalar no Android:</h4>
            <ol className="text-sm text-green-700 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="bg-green-200 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                <span>Toque no ícone <strong>Menu</strong> (⋮) no canto superior direito</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-green-200 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                <span>Toque em <strong>"Adicionar à tela inicial"</strong> ou <strong>"Instalar app"</strong></span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-green-200 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                <span>Toque em <strong>"Adicionar"</strong> para confirmar</span>
              </li>
            </ol>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              <strong>💡 Dica:</strong> O app será instalado como um app nativo e funcionará offline!
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2">💻 Como instalar no Desktop:</h4>
            <ol className="text-sm text-purple-700 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="bg-purple-200 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                <span>Procure pelo ícone <strong>Instalar</strong> (⬇️) na barra de endereços</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-purple-200 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                <span>Toque em <strong>"Instalar"</strong> quando aparecer</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-purple-200 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                <span>O app será adicionado ao seu computador</span>
              </li>
            </ol>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              <strong>💡 Dica:</strong> O app funcionará como um programa normal do seu computador!
            </p>
          </div>
        </div>
      );
    }
  };

  if (showInstructions) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Como instalar o app</h3>
              <button
                onClick={handleCloseInstructions}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {renderInstructions()}
            <div className="mt-6">
              <button
                onClick={handleCloseInstructions}
                className="w-full bg-primary-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Entendi!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const effectivePrompt = deferredPrompt || isDevelopment;

  return (
    <div
      className={`fixed z-50 bg-white rounded-xl shadow-lg border border-primary-200 animate-slideUp ${
        isMobile ? "bottom-4 left-4 right-4 p-4" : "top-4 right-4 max-w-md p-6"
      }`}
    >
      <div className={`flex items-start space-x-3 ${isMobile ? "" : "flex-col space-y-4"}`}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-beige-600 rounded-full flex items-center justify-center">
                <Image
                  src="/images/icon-192.png"
                  alt="Lorena Felicio"
                  className="w-full h-full"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <h3 className={`font-bold text-gray-900 ${isMobile ? "text-sm" : "text-lg"}`}>Lorena Felicio</h3>
                <p className={`text-xs text-gray-500 ${isMobile ? "text-xs" : "text-sm"}`}>Confeitaria Artística</p>
              </div>
            </div>
          </div>

          {isMobile ? (
            <div className="bg-gradient-to-r from-primary-50 to-beige-50 rounded-lg p-3 mb-3">
              <p className="text-xs text-gray-600">
                Adicione o app Lorena Felicio ao seu celular para acesso rápido, seguro e offline aos nosso deliciosos
                doces artesanais.
              </p>
            </div>
          ) : (
            <div className="space-y-3 mb-4">
              <div>
                <p className="bg-gradient-to-r from-primary-50 to-beige-50 rounded-lg p-3 text-sm text-gray-600 leading-relaxed">
                  Tenha acesso rápido ao site, sem precisar abrir o navegador toda vez.
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Acesso direto da tela inicial</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Funciona offline</span>
                </div>
              </div>
            </div>
          )}

          <div className={`flex space-x-2 flex-col space-y-3`}>
            <button
              onClick={handleInstallClick}
              disabled={!effectivePrompt && !isDevelopment}
              className={`bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-md hover:shadow-lg ${
                isMobile
                  ? "flex-1 text-xs py-2 px-3"
                  : "w-full text-sm py-3 px-4 flex items-center justify-center space-x-2"
              } ${!effectivePrompt && !isDevelopment ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {!isMobile && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span>{isMobile ? "Instalar" : "Instalar Agora"}</span>
            </button>
            
            <div className="flex space-x-2">
              <button
                onClick={handleShowInstructions}
                className={`text-primary-600 hover:text-primary-700 transition-colors duration-200 underline text-center ${
                  isMobile ? "text-xs" : "text-sm"
                }`}
              >
                Como instalar?
              </button>
              <button
                onClick={handleDismiss}
                className={`text-gray-500 hover:text-gray-700 transition-colors duration-200 underline text-center ${
                  isMobile ? "text-xs" : "text-sm"
                }`}
              >
                {isMobile ? "Agora não" : "Continuar no navegador"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
