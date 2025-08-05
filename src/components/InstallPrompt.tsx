"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDevelopment, setIsDevelopment] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const checkPWASupport = () => {
    const isSupported = "serviceWorker" in navigator && "PushManager" in window;
    return isSupported;
  };

  useEffect(() => {
    const checkDismissed = () => {
      const wasDismissed = localStorage.getItem("pwa-dismissed") === "true";
      setDismissed(wasDismissed);
    };

    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
      setIsMobile(isMobileDevice && !isStandalone);
    };

    const checkDevelopment = () => {
      const isDev = process.env.NODE_ENV === "development" || window.location.hostname === "localhost";
      setIsDevelopment(isDev);
    };

    checkDismissed();
    checkMobile();
    checkDevelopment();

    const handleBeforeInstallPrompt = (e: Event) => {
      // e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    const checkExistingPrompt = () => {
      if (isDevelopment && !deferredPrompt) {
        setShowPrompt(true);
      }
    };

    const handleAppInstalled = () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("resize", checkMobile);

    const timer = setTimeout(() => {
      if (isDevelopment && !showPrompt && !deferredPrompt && !dismissed) {
        setShowPrompt(true);
        checkExistingPrompt();
      }
    }, 3000);

    if (isDevelopment && !dismissed) {
      setTimeout(() => {
        if (!showPrompt) {
          setShowPrompt(true);
        }
      }, 1000);
    }

    // Log para debug

    if (!dismissed) {
      checkExistingPrompt();
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timer);
    };
  }, [isMobile, showPrompt, deferredPrompt, isDevelopment, dismissed]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
          setShowPrompt(false);
          setDeferredPrompt(null);
        }
      } catch (error) {
        console.error("Error during install prompt:", error);
      }
    } else if (isDevelopment) {

      if (checkPWASupport()) {

        try {

          const fakeEvent = new Event("beforeinstallprompt");
          window.dispatchEvent(fakeEvent);


          if ("getInstalledRelatedApps" in navigator) {
          }


          setTimeout(() => {
            if (!deferredPrompt) {
              alert(
                "Para testar a instalação PWA:\n\n1. Use Chrome/Edge\n2. Acesse via HTTPS (localhost funciona)\n3. Ou clique em 'Adicionar à tela inicial' no menu do navegador\n\nO prompt real aparecerá automaticamente quando o navegador detectar que o app pode ser instalado."
              );
            }
          }, 2000);
        } catch (error) {
          console.error("Error trying to trigger prompt:", error);
          alert("Erro ao tentar abrir prompt. Use o menu do navegador para instalar.");
        }
      } else {
        alert("Seu navegador não suporta PWA. Use Chrome ou Edge para testar.");
      }
    } else {
      alert("Instalação não disponível no momento. Tente novamente mais tarde.");
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDeferredPrompt(null);
    setDismissed(true);
    localStorage.setItem("pwa-dismissed", "true");
  };

  const handleTestPrompt = () => {
    setShowPrompt(true);
  };

  if (!showPrompt || dismissed) {
    if (isDevelopment && !dismissed) {
      return (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={handleTestPrompt}
            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-2 rounded-lg shadow-md"
          >
            Testar Prompt PWA
          </button>
        </div>
      );
    }
    return null;
  }

  const effectivePrompt = deferredPrompt || (isDevelopment ? ({} as BeforeInstallPromptEvent) : null);

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
                  src="/images/icons/icon-192.png"
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
            <button
              onClick={handleDismiss}
              className={`text-gray-500 hover:text-gray-700 transition-colors duration-200 underline text-center ${
                isMobile ? "text-xs" : "text-sm "
              }`}
            >
              {isMobile ? "Agora não" : "Continuar no navegador"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
