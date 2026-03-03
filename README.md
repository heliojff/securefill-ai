# SecureFill AI - Cadastro Inteligente com Gemini Nano

Este projeto é uma aplicação experimental desenvolvida para testar as capacidades da **Prompt API (Gemini Nano)** nativa do Google Chrome.

## 🎯 Objetivo
O objetivo principal é demonstrar o uso de modelos de linguagem de IA rodando localmente no navegador para extração e estruturação de dados a partir de documentos (imagens/PDFs), garantindo privacidade total ao usuário, já que nenhum dado sensível sai do dispositivo.

## 🧪 Contexto Experimental
Este projeto utiliza recursos que ainda não estão disponíveis para o público geral por padrão. Ele serve como um laboratório para:
- Integração com a interface `window.LanguageModel`.
- Processamento multimodal (texto + imagem) local.
- Monitoramento de ciclo de vida de modelos de IA no cliente.
- Teste de uso do recurso experimental do Chrome.

## 🛠️ Como Habilitar no Chrome
Para que a aplicação funcione, você deve estar utilizando o **Google Chrome (v128+)** ou **Chrome Canary** e ativar as seguintes flags em `chrome://flags`:

1.  **Prompt API for Gemini Nano**: `Enabled`
    - `chrome://flags/#prompt-api-for-gemini-nano`
2.  **Enables optimization guide on device**: `Enabled (BypassPerfRequirement)`
    - `chrome://flags/#optimization-guide-on-device-model`

Após ativar as flags, reinicie o navegador.

## 🚀 Tecnologias
- **Next.js 14+**: Framework principal.
- **TypeScript**: Tipagem estrita para APIs experimentais.
- **Tailwind CSS**: Estilização moderna e responsiva.
- **Radix UI**: Componentes acessíveis.
- **Tesseract.js**: OCR de fallback para documentos complexos.

## 📦 Instalação
1. Clone o repositório.
2. Instale as dependências: `npm install`.
3. Inicie o servidor: `npm run dev`.
4. Acesse `http://localhost:3000`.
