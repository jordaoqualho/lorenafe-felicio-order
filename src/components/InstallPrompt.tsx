"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface InstallPromptProps {
  onDismiss?: () => void;
}

export default function InstallPrompt({ onDismiss }: InstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDevelopment, setIsDevelopment] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop">("desktop");
  const [isChromeMobile, setIsChromeMobile] = useState(false);

  useEffect(() => {
    const checkPWASupport = () => {
      const isDev = process.env.NODE_ENV === "development";
      setIsDevelopment(isDev);

      const userAgent = navigator.userAgent.toLowerCase();
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const isAndroid = /android/.test(userAgent);
      const isMobileDevice = /mobile|android|iphone|ipad/.test(userAgent);
      const isChrome = /chrome/.test(userAgent) && !/edge/.test(userAgent);
      const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);

      setIsMobile(isMobileDevice);

      if (isIOS) {
        setPlatform("ios");
      } else if (isAndroid) {
        setPlatform("android");
      } else {
        setPlatform("desktop");
      }

      // Verificar se é Chrome mobile (que suporta instalação direta)
      if (isMobileDevice && isChrome) {
        setIsChromeMobile(true);
      }

      const dismissedPrompt = localStorage.getItem("pwa-prompt-dismissed");
      if (dismissedPrompt) {
        setDismissed(true);
        return;
      }

      // Mostrar prompt em desenvolvimento ou se há deferredPrompt
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
      // Em desenvolvimento, tentar simular a instalação
      try {
        // Verificar se o navegador suporta PWA
        if ('serviceWorker' in navigator) {
          alert("Em desenvolvimento: Para instalar o PWA, use o menu do navegador ou aguarde o prompt nativo aparecer.");
        } else {
          alert("Seu navegador não suporta PWA. Use Chrome ou Edge para testar.");
        }
      } catch (error) {
        alert("Erro ao tentar instalar. Use o menu do navegador para instalar o PWA.");
      }
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDismissed(true);
    localStorage.setItem("pwa-prompt-dismissed", "true");
    if (onDismiss) onDismiss();
  };

  if (dismissed || !showPrompt) return null;

  const effectivePrompt = deferredPrompt || isDevelopment;

  // Desktop: Prompt no canto superior direito
  if (!isMobile) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-white rounded-xl shadow-lg border border-primary-200 animate-slideUp max-w-md p-6">
        <div className="flex items-start space-x-3">
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
                  <h3 className="font-bold text-gray-900 text-lg">Lorena Felicio</h3>
                  <p className="text-sm text-gray-500">Confeitaria Artística</p>
                </div>
              </div>
            </div>

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

            <div className="space-y-3">
              <button
                onClick={handleInstallClick}
                disabled={!effectivePrompt}
                className={`w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-md hover:shadow-lg text-sm py-3 px-4 flex items-center justify-center space-x-2 ${
                  !effectivePrompt ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Instalar Agora</span>
              </button>
              <button
                onClick={handleDismiss}
                className="w-full text-gray-500 hover:text-gray-700 transition-colors duration-200 underline text-center text-sm"
              >
                Continuar no navegador
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mobile: Prompt na parte inferior
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-white rounded-xl shadow-lg border border-primary-200 animate-slideUp p-4">
      <div className="flex items-start space-x-3">
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
                <h3 className="font-bold text-gray-900 text-sm">Lorena Felicio</h3>
                <p className="text-xs text-gray-500">Confeitaria Artística</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary-50 to-beige-50 rounded-lg p-3 mb-3">
            <p className="text-xs text-gray-600">
              Adicione o app Lorena Felicio ao seu celular para acesso rápido, seguro e offline aos nossos deliciosos
              doces artesanais.
            </p>
          </div>

          {isChromeMobile && deferredPrompt ? (
            <div className="space-y-2">
              <button
                onClick={handleInstallClick}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-md hover:shadow-lg text-xs py-2 px-3"
              >
                Instalar Agora
              </button>
              <button
                onClick={handleDismiss}
                className="w-full text-gray-500 hover:text-gray-700 transition-colors duration-200 underline text-center text-xs"
              >
                Agora não
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => {
                  const modal = document.createElement("div");
                  modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4";
                  modal.innerHTML = `
                    <div class="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
                      <div class="p-6">
                        <div class="flex items-center justify-between mb-4">
                          <h3 class="text-lg font-bold text-gray-900">Como instalar o app</h3>
                          <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        ${
                          platform === "ios"
                            ? `
                          <div class="space-y-4">
                            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <h4 class="font-semibold text-blue-800 mb-2">📱 Como instalar no iPhone:</h4>
                              <ol class="text-sm text-blue-700 space-y-2">
                                <li class="flex items-start space-x-2">
                                  <span class="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                    1
                                  </span>
                                  <span>
                                    Toque no ícone <strong>Compartilhar</strong> (📤) na barra de navegação
                                  </span>
                                </li>
                                <li class="flex items-start space-x-2">
                                  <span class="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                    2
                                  </span>
                                  <span>
                                    Role para baixo e toque em <strong>"Adicionar à Tela Inicial"</strong>
                                  </span>
                                </li>
                                <li class="flex items-start space-x-2">
                                  <span class="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                    3
                                  </span>
                                  <span>
                                    Toque em <strong>"Adicionar"</strong> para confirmar
                                  </span>
                                </li>
                              </ol>
                            </div>
                            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                              <p class="text-sm text-gray-600">
                                <strong>💡 Por que instalar?</strong> Acesso rápido, funciona offline e aparece como um app normal na sua
                                tela inicial!
                              </p>
                            </div>
                          </div>
                        `
                            : `
                          <div class="space-y-4">
                            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                              <h4 class="font-semibold text-green-800 mb-2">📱 Como instalar no Android:</h4>
                              <ol class="text-sm text-green-700 space-y-2">
                                <li class="flex items-start space-x-2">
                                  <span class="bg-green-200 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                    1
                                  </span>
                                  <span>
                                    Toque no ícone <strong>Menu</strong> (⋮) no canto superior direito
                                  </span>
                                </li>
                                <li class="flex items-start space-x-2">
                                  <span class="bg-green-200 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                    2
                                  </span>
                                  <span>
                                    Toque em <strong>"Adicionar à tela inicial"</strong> ou <strong>"Instalar app"</strong>
                                  </span>
                                </li>
                                <li class="flex items-start space-x-2">
                                  <span class="bg-green-200 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                    3
                                  </span>
                                  <span>
                                    Toque em <strong>"Adicionar"</strong> para confirmar
                                  </span>
                                </li>
                              </ol>
                            </div>
                            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                              <p class="text-sm text-gray-600">
                                <strong>💡 Por que instalar?</strong> O app será instalado como um app nativo e funcionará offline!
                              </p>
                            </div>
                          </div>
                        `
                        }
                        <div class="mt-6">
                          <button onclick="this.closest('.fixed').remove()" class="w-full bg-primary-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                            Entendi!
                          </button>
                        </div>
                      </div>
                    </div>
                  `;
                  document.body.appendChild(modal);
                }}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-md hover:shadow-lg text-xs py-2 px-3"
              >
                Como instalar?
              </button>
              <button
                onClick={handleDismiss}
                className="w-full text-gray-500 hover:text-gray-700 transition-colors duration-200 underline text-center text-xs"
              >
                Agora não
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
