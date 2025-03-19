// src/types/openai.d.ts
import { ChatCompletion, ImagesResponse } from 'openai';

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
export interface CustomChatCompletion extends ChatCompletion {
  processedContent?: string;
}

export interface CustomImagesResponse extends ImagesResponse {
  processedUrls?: string[];
}