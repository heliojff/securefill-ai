'use client';

import { useState } from 'react';
import { BannerAI } from '@/components/BannerAI';
import { Dropzone } from '@/components/Dropzone';
import { RegistrationForm } from '@/components/RegistrationForm';
import { initialFormData, FormData } from '@/types/form';
import { ShieldCheck } from 'lucide-react';

export default function Home() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleFieldChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDataExtracted = (extractedData: Partial<FormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...extractedData
    }));
  };

  const handleStartProcessing = () => {
    setFormData(initialFormData);
  };

  return (
    <main className="min-h-screen bg-anthracite selection:bg-burgundy/30">
      <BannerAI />
      
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-burgundy font-bold tracking-tighter text-xl uppercase">
              <ShieldCheck className="w-6 h-6" />
              SecureFill AI
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Cadastro Inteligente
            </h1>
            <p className="text-white/40 text-lg max-w-xl">
              Faça upload de documentos para preenchimento automático utilizando a IA local Gemini Nano do Chrome.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Coluna de Upload */}
          <aside className="lg:col-span-4 space-y-8">
            <section className="space-y-4">
              <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest">
                Documento
              </h2>
              <Dropzone 
                onDataExtracted={handleDataExtracted} 
                onStartProcessing={handleStartProcessing}
              />
            </section>
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <h3 className="text-white font-medium flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-burgundy" />
                Privacidade Local
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Seus dados são processados inteiramente no seu navegador. Nenhuma informação ou imagem é enviada para servidores externos.
              </p>
            </div>
          </aside>

          {/* Coluna de Formulário */}
          <div className="lg:col-span-8">
            <section className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl">
              <RegistrationForm 
                data={formData} 
                onChange={handleFieldChange} 
              />
              
              <div className="mt-12 flex justify-end">
                <button 
                  className="px-8 py-4 bg-burgundy hover:bg-burgundy-hover text-white font-bold rounded-xl transition-all shadow-lg shadow-burgundy/20"
                  onClick={() => alert('Cadastro enviado com sucesso! (Simulação)')}
                >
                  Finalizar Cadastro
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
