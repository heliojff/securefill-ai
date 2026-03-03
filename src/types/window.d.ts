export {};

declare global {
  type AISessionAvailability = 'available' | 'unavailable' | 'downloading' | 'downloadable';

  interface AIAssistantCapabilities {
    available: AISessionAvailability;
  }

  interface LanguageModelPromptContent {
    type: 'text' | 'image' | 'audio';
    value: string | Blob;
  }

  interface LanguageModelPromptMessage {
    role: 'system' | 'user' | 'assistant';
    content: string | LanguageModelPromptContent[];
  }

  interface LanguageModel {
    prompt(input: string | LanguageModelPromptMessage[]): Promise<string>;
    promptStreaming(
      input: string | LanguageModelPromptMessage[],
      options?: { signal?: AbortSignal }
    ): AsyncIterable<string>;
    destroy(): void;
  }

  interface LanguageModelDownloadProgressEvent extends Event {
    loaded: number;
    total: number;
  }

  interface LanguageModelMonitor extends EventTarget {
    addEventListener(
      type: 'downloadprogress',
      callback: (event: LanguageModelDownloadProgressEvent) => void
    ): void;
  }

  interface LanguageModelFactory {
    create(options?: {
      temperature?: number;
      topK?: number;
      expectedInputs?: { type: string; languages?: string[] }[];
      expectedOutputs?: { type: string; languages?: string[] }[];
      initialPrompts?: LanguageModelPromptMessage[];
      monitor?(m: LanguageModelMonitor): void;
    }): Promise<LanguageModel>;
    availability(options?: { languages?: string[] }): Promise<AISessionAvailability>;
    params(): Promise<any>;
  }

  var LanguageModel: LanguageModelFactory;

  // APIs Adicionais (Referência)
  var Translator: any;
  var LanguageDetector: any;
}
