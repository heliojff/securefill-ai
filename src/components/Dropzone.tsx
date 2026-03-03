'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGeminiNano } from '@/hooks/useGeminiNano';
import { FormData } from '@/types/form';

interface DropzoneProps {
  onDataExtracted: (data: Partial<FormData>) => void;
  onStartProcessing?: () => void;
}

export function Dropzone({ onDataExtracted, onStartProcessing }: DropzoneProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { hasApi, status, isProcessing, errors, processFile } = useGeminiNano();

  const isDisabled = !file || isProcessing || !hasApi || status === 'checking' || status === 'downloading';

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (!hasApi) {
      alert('A funcionalidade de IA não está habilitada no seu navegador. Habilite em chrome://flags/#prompt-api-for-gemini-nano');
      return;
    }
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        setPreview(null);
      }
    }
  }, [hasApi]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf'],
    },
    multiple: false,
  });

  const clearFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleProcess = async () => {
    if (!file) return;
    if (!hasApi) {
      alert('A funcionalidade de IA não está habilitada no seu navegador. Habilite em chrome://flags/#prompt-api-for-gemini-nano');
      return;
    }

    onStartProcessing?.();
    const data = await processFile(file);
    if (data) {
      onDataExtracted(data);
    }
  };

  return (
    <div className="space-y-4 w-full">
      {!file ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-4 transition-colors cursor-pointer",
            isDragActive ? "border-burgundy bg-burgundy/5" : "border-white/10 hover:border-burgundy/50 bg-white/5"
          )}
        >
          <input {...getInputProps()} />
          <div className="bg-burgundy/10 p-4 rounded-full">
            <Upload className="w-8 h-8 text-burgundy" />
          </div>
          <div className="text-center">
            <p className="text-white font-medium">Arraste seu documento aqui ou clique para selecionar</p>
            <p className="text-white/40 text-sm mt-1">Formatos suportados: PNG, JPG, PDF</p>
          </div>
        </div>
      ) : (
        <div className="relative border border-white/10 rounded-xl overflow-hidden bg-white/5">
          <button
            onClick={clearFile}
            className="absolute top-3 right-3 z-10 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-4 p-6">
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-black flex items-center justify-center flex-shrink-0">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <FileText className="w-10 h-10 text-white/20" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{file.name}</p>
              <p className="text-white/40 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
        </div>
      )}

      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((err, i) => (
            <p key={i} className="text-red-400 text-xs text-center px-4 tracking-tight">{err}</p>
          ))}
        </div>
      )}

      <button
        onClick={handleProcess}
        disabled={isDisabled}
        className={cn(
          "w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all",
          isDisabled
            ? "bg-white/10 text-white/40 cursor-not-allowed"
            : "bg-burgundy hover:bg-burgundy-hover text-white shadow-lg shadow-burgundy/20"
        )}
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processando Documento...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Processar Documento
          </>
        )}
      </button>
    </div>
  );
}
