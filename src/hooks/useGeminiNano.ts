'use client';

import { useState, useEffect, useCallback } from 'react';
import { FormData } from '@/types/form';

export function useGeminiNano() {
  const [hasApi, setHasApi] = useState<boolean>(false);
  const [status, setStatus] = useState<AISessionAvailability | 'checking'>('checking');
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  const checkRequirements = useCallback(async () => {
    const errs: string[] = [];

    if (typeof window === 'undefined') return;

    const apiAvailable = 'LanguageModel' in self;
    setHasApi(apiAvailable);

    // 1. Chrome Check
    // @ts-ignore
    const isChrome = !!window.chrome;
    if (!isChrome) {
      errs.push("⚠️ Este recurso só funciona no Google Chrome ou Chrome Canary (versão recente).");
    }

    // 2. LanguageModel API Check
    if (!apiAvailable) {
      errs.push("⚠️ As APIs nativas de IA não estão ativas.");
      errs.push("Ative a flag: chrome://flags/#prompt-api-for-gemini-nano");
      setErrors(errs);
      setStatus('unavailable');
      return;
    }

    // 3. Availability Check
    try {
      const availability = await LanguageModel.availability({ languages: ["en"] });
      setStatus(availability);

      if (availability === 'unavailable') {
        errs.push("⚠️ O seu dispositivo não suporta modelos de linguagem nativos de IA.");
      }

      if (availability === 'downloading') {
        errs.push("⚠️ O modelo de linguagem de IA está sendo baixado. Aguarde alguns minutos.");
      }

      if (availability === 'downloadable') {
        errs.push("⚠️ O modelo de linguagem precisa ser baixado antes do uso.");
      }

      setErrors(errs);
    } catch (err) {
      console.error('Erro ao verificar disponibilidade:', err);
      setStatus('unavailable');
      setErrors(["⚠️ Erro ao acessar a API LanguageModel."]);
    }
  }, []);

  useEffect(() => {
    checkRequirements();
  }, [checkRequirements]);

  const processFile = async (file: File): Promise<Partial<FormData> | null> => {
    setIsProcessing(true);
    setErrors([]);

    try {
      if (!('LanguageModel' in self)) {
        throw new Error('API LanguageModel não detectada no navegador.');
      }

      // Sempre pegue o estado mais recente de disponibilidade no momento do clique
      const currentAvailability = await LanguageModel.availability({ languages: ['en'] });
      setStatus(currentAvailability);

      if (currentAvailability === 'unavailable') {
        throw new Error('O seu dispositivo não suporta modelos de IA nativos ou o recurso está indisponível.');
      }

      if (currentAvailability === 'downloading') {
        throw new Error('O modelo de IA ainda está sendo baixado. Aguarde alguns minutos e tente novamente.');
      }

      // 1. Handle Download if needed
      if (currentAvailability === 'downloadable') {
        try {
          let started = false;
          const downloadSession = await LanguageModel.create({
            monitor(m) {
              m.addEventListener('downloadprogress', (e) => {
                if (!started) {
                  started = true;
                  setStatus('downloading');
                }
                const percent = Math.round((e.loaded / e.total) * 100);
                setDownloadProgress(percent);
              });
            }
          });
          // Initiate a dummy prompt to trigger/verify
          await downloadSession.prompt('Initialize');
          downloadSession.destroy();
          await checkRequirements();

          const afterDownload = await LanguageModel.availability({ languages: ['en'] });
          setStatus(afterDownload);
          if (afterDownload !== 'available') {
            throw new Error('O download do modelo foi iniciado, mas ele ainda não está pronto. Aguarde e tente novamente.');
          }
        } catch (e) {
          throw new Error('Falha ao baixar ou inicializar o modelo de IA.');
        }
      }

      // 2. Create Multimodal Session
      const session = await LanguageModel.create({
        temperature: 0.1,
        topK: 1,
        expectedInputs: [
          { type: "text", languages: ["en"] },
          { type: "image" },
        ],
        initialPrompts: [
          {
            role: 'system',
            content: [
              { 
                type: 'text', 
                value: 'Você é um assistente especializado em extração de dados de documentos brasileiros. Retorne APENAS um objeto JSON puro, sem explicações ou markdown.' 
              }
            ]
          }
        ]
      });

      // 3. Build Multimodal Content
      const fileBlob = new Blob([await file.arrayBuffer()], { type: file.type });
      const userContent: LanguageModelPromptContent[] = [
        { 
          type: 'text', 
          value: 'Extraia do documento anexo: nome, nomeMae, documento (CPF, RG ou CNH), cidade, estado, telefone, email, cep, logradouro, bairro.' 
        }
      ];

      if (file.type.startsWith('image/')) {
        userContent.push({ type: 'image', value: fileBlob });
      } else {
        // Simple fallback if it's a PDF (as multimodal PDF support might vary)
        userContent.push({ type: 'text', value: `[Processando arquivo: ${file.name}]` });
      }

      const result = await session.prompt([
        { role: 'user', content: userContent }
      ]);
      
      session.destroy();

      // 4. Parse JSON
      const cleanedResult = result.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanedResult);

    } catch (err: any) {
      console.error('Process error:', err);
      setErrors([err.message || 'Erro no processamento da IA.']);
      return null;
    } finally {
      setIsProcessing(false);
      setDownloadProgress(0);
    }
  };

  return { 
    hasApi,
    status, 
    isAvailable: status === 'available', 
    downloadProgress, 
    isProcessing, 
    errors, 
    processFile 
  };
}
