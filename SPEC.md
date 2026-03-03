Utilize o diretorio: /home/heliojff/projetos/pos/modulo-05
responda tudo em pt-br

# Especificação Técnica: Sistema de Preenchimento Automático com IA (Gemini Nano)

## 1. Visão Geral
Este documento descreve os requisitos para o desenvolvimento de uma aplicação web moderna que permite o upload de documentos e imagens, utilizando a API experimental `LanguageModel` (Gemini Nano) do Chrome para extrair informações e preencher automaticamente um formulário de cadastro.

## 2. Stack Tecnológica
- **Framework:** Next.js 14+ (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Componentes:** Radix UI ou Headless UI (para acessibilidade em Tabs e Modais)
- **Ícones:** Lucide React
- **Gerenciamento de Estado:** React Hooks (UseContext ou UseState conforme complexidade)

## 3. Requisitos Funcionais

### 3.1. Upload de Arquivos
- **Formatos Suportados:** `.pdf`, `.png`, `.jpeg`, `.jpg`.
- **Interface:** Área de Drag and Drop e botão de seleção de arquivo.
- **Preview:** Exibição imediata da imagem selecionada (ou ícone representativo para PDF).
- **Botão de Processamento:** 
  - Texto: "Processar Documento".
  - Estado Inicial: Desabilitado.
  - Habilitado somente se houver um arquivo selecionado e o recurso `window.LanguageModel` estiver disponível.

### 3.2. Integração com IA (Gemini Nano)
- **Verificação de Disponibilidade:** O sistema deve verificar se `window.LanguageModel` estão acessíveis.
- **Instruções ao Usuário:**
  - Exibir banner (faixa) vermelho no topo caso o recurso esteja desabilitado.
  - Link/Texto instrutivo: `chrome://flags/#prompt-api-for-gemini-nano`.
- **Fluxo de Processamento:**
  - Ao clicar em "Processar", enviar o contexto da imagem/documento para o modelo.
  - O prompt deve solicitar a extração de: Nome, Nome da Mãe, Cidade, Estado, Telefone, Email, CEP e Endereço.
- **Tratamento de Erros:** Alertar o usuário caso a API não responda ou retorne erro de indisponibilidade.

### 3.3. Formulário de Cadastro
O formulário será dividido em duas abas:

#### Aba 1: Dados Pessoais
- Nome Completo
- Nome da Mãe
- Cidade
- Estado
- Telefone
- E-mail

#### Aba 2: Endereço
- CEP
- Logradouro (Rua/Avenida)
- Bairro
- Número
- Complemento
- Estado
- Cidade

## 4. Design e UX

### 4.1. Estética
- **Tema:** Dark Mode (Fundo escuro/antracite).
- **Cores de Destaque:** Bordô (Burgundy) para botões primários, estados ativos e bordas de destaque.
- **Estilo:** Corporativo, limpo e profissional.

### 4.2. Comportamento do Botão de Processamento
- Se o usuário tentar selecionar uma imagem com o recurso desabilitado, emitir um `alert` informativo.
- Manter o botão desabilitado se `window.ai` for `undefined`.

### 4.3. Banner de Aviso
- Fixado no topo da página.
- Cor de fundo vermelha com texto branco.
- Mensagem: "Atenção: Recurso de IA experimental não detectado. Habilite em chrome://flags/#prompt-api-for-gemini-nano para funcionalidade completa."

## 5. Arquitetura de Pastas Sugerida
- `/src/components`: Componentes reutilizáveis (Button, Input, Dropzone, Tabs).
- `/src/hooks`: Hook customizado `useGeminiNano` para gerenciar a lógica da IA.
- `/src/types`: Definições de interfaces TypeScript.
- `/src/app`: Páginas e layout (App Router).

## 6. Boas Práticas
- **Componentização:** Evitar lógica excessiva na página principal.
- **Tipagem Estrita:** Uso rigoroso de Interfaces para dados do formulário e respostas da IA.
- **Feedback Visual:** Skeleton screens ou spinners durante o processamento da imagem pela IA.
- **Acessibilidade (a11y):** Garantir que as abas e inputs sejam navegáveis via teclado.
