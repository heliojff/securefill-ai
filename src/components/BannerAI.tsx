'use client';

import { AlertCircle, ExternalLink, Loader2, Download } from 'lucide-react';
import { useGeminiNano } from '@/hooks/useGeminiNano';

export function BannerAI() {
  const { status, downloadProgress, isAvailable } = useGeminiNano();

  if (isAvailable || status === 'checking') return null;

  const getBannerConfig = () => {
    switch (status) {
      case 'downloading':
        return {
          bg: 'bg-blue-600',
          icon: <Loader2 className="w-5 h-5 animate-spin" />,
          text: `Baixando modelo de IA: ${downloadProgress}% concluído. Por favor, não feche o navegador.`,
        };
      case 'downloadable':
        return {
          bg: 'bg-amber-600',
          icon: <Download className="w-5 h-5" />,
          text: 'O modelo de IA precisa ser baixado. O download iniciará ao processar o primeiro documento.',
        };
      default:
        return {
          bg: 'bg-red-600',
          icon: <AlertCircle className="w-5 h-5" />,
          text: 'Recurso de IA experimental não detectado ou desabilitado.',
        };
    }
  };

  const config = getBannerConfig();

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${config.bg} text-white px-4 py-2 flex items-center justify-center gap-3 shadow-lg text-center transition-colors duration-500`}>
      {config.icon}
      <p className="text-sm font-medium">
        {config.text}
        {status === 'unavailable' && (
          <>
            {' '}Habilite em <code className="bg-red-700 px-1 rounded">chrome://flags/#prompt-api-for-gemini-nano</code>
          </>
        )}
      </p>
      <a 
        href="https://developer.chrome.com/docs/ai/built-in" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-1 hover:underline text-xs opacity-80 ml-2"
      >
        <ExternalLink className="w-3 h-3" />
        Docs
      </a>
    </div>
  );
}
