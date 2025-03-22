// src/types/openai.d.ts
import type { ImagesResponse } from 'openai/resources/images';
import type { CompletionCreateParams } from 'openai/resources/completions';

declare module 'openai' {
  export interface OpenAITextResponse {
    text: string;
    model: string;
    tokens: number;
  }

  export interface OpenAIImageResponse {
    imageUrl: string;
    revisedPrompt?: string;
  }

  export interface OpenAIServiceResponse {
    type: 'text' | 'image';
    content: string;
    metadata?: {
      model?: string;
      tokens?: number;
      revisedPrompt?: string;
    };
  }
}
export type CustomChatCompletion = CompletionCreateParams & {
  processedContent?: string;
};
export type CustomImagesResponse = ImagesResponse & {
  processedUrls?: string[];
};