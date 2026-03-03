'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { User, MapPin } from 'lucide-react';
import { FormData } from '@/types/form';
import { InputField } from './InputField';
import { cn } from '@/lib/utils';

interface RegistrationFormProps {
  data: FormData;
  onChange: (field: keyof FormData, value: string) => void;
}

export function RegistrationForm({ data, onChange }: RegistrationFormProps) {
  return (
    <Tabs.Root defaultValue="personal" className="w-full">
      <Tabs.List className="flex border-b border-white/10 mb-8 overflow-x-auto scrollbar-none">
        <Tabs.Trigger
          value="personal"
          className={cn(
            "flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all outline-none border-b-2 flex-shrink-0",
            "data-[state=active]:border-burgundy data-[state=active]:text-white",
            "data-[state=inactive]:border-transparent data-[state=inactive]:text-white/40 hover:text-white/60"
          )}
        >
          <User className="w-4 h-4" />
          Dados Pessoais
        </Tabs.Trigger>
        <Tabs.Trigger
          value="address"
          className={cn(
            "flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all outline-none border-b-2 flex-shrink-0",
            "data-[state=active]:border-burgundy data-[state=active]:text-white",
            "data-[state=inactive]:border-transparent data-[state=inactive]:text-white/40 hover:text-white/60"
          )}
        >
          <MapPin className="w-4 h-4" />
          Endereço
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="personal" className="space-y-6 outline-none animate-in fade-in duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Nome Completo"
            placeholder="João Silva"
            value={data.nome}
            onChange={(e) => onChange('nome', e.target.value)}
          />
          <InputField
            label="Nome da Mãe"
            placeholder="Maria Silva"
            value={data.nomeMae}
            onChange={(e) => onChange('nomeMae', e.target.value)}
          />
          <InputField
            label="Documento (CPF, RG ou CNH)"
            placeholder="000.000.000-00"
            value={data.documento}
            onChange={(e) => onChange('documento', e.target.value)}
          />
          <InputField
            label="Telefone"
            placeholder="(11) 99999-9999"
            value={data.telefone}
            onChange={(e) => onChange('telefone', e.target.value)}
          />
          <InputField
            label="E-mail"
            type="email"
            placeholder="joao@exemplo.com"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
        </div>
      </Tabs.Content>

      <Tabs.Content value="address" className="space-y-6 outline-none animate-in fade-in duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="CEP"
            placeholder="00000-000"
            value={data.cep}
            onChange={(e) => onChange('cep', e.target.value)}
          />
          <InputField
            label="Logradouro (Rua/Avenida)"
            placeholder="Rua das Flores"
            value={data.logradouro}
            onChange={(e) => onChange('logradouro', e.target.value)}
          />
          <InputField
            label="Bairro"
            placeholder="Centro"
            value={data.bairro}
            onChange={(e) => onChange('bairro', e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Número"
              placeholder="123"
              value={data.numero}
              onChange={(e) => onChange('numero', e.target.value)}
            />
            <InputField
              label="Complemento"
              placeholder="Apto 1"
              value={data.complemento}
              onChange={(e) => onChange('complemento', e.target.value)}
            />
          </div>
          <InputField
            label="Estado"
            placeholder="SP"
            value={data.estado}
            onChange={(e) => onChange('estado', e.target.value)}
          />
          <InputField
            label="Cidade"
            placeholder="São Paulo"
            value={data.cidade}
            onChange={(e) => onChange('cidade', e.target.value)}
          />
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}
