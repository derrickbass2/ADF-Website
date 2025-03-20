// src/types/openai.d.ts
import type { ChatCompletionCreateParams } from 'openai/resources/chat';
import type { ImagesResponse } from 'openai/resources/images';

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
// Extend existing types if needed
export type CustomChatCompletion = ChatCompletionCreateParams & {
  processedContent?: string;
};

export type CustomImagesResponse = ImagesResponse & {
  processedUrls?: string[];
};