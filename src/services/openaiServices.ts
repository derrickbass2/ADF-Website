// src/services/openaiService.ts
import OpenAI from 'openai';

class OpenAIService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true // Use with caution in production
    });
  }

  async generateText(prompt: string, model: string = 'gpt-4o'): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        model: model,
        messages: [{ 
          role: 'user', 
          content: prompt 
        }]
      });

      return completion.choices[0].message.content || 'No response generated';
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  }

  async generateImage(prompt: string, size: '256x256' | '512x512' | '1024x1024' = '512x512'): Promise<string> {
    try {
      const response = await this.client.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: size
      });

      return response.data[0].url || '';
    } catch (error) {
      console.error('OpenAI Image Generation Error:', error);
      throw error;
    }
  }

  // Add more methods as needed, like code generation, translation, etc.
// Add to openaiService.ts
private async retryWithBackoff<T>(
    fn: () => Promise<T>, 
    maxRetries = 3
  ): Promise<T> {
    let retries = 0;
    while (retries < maxRetries) {
      try {
        return await fn();
      } catch (error: any) {
        if (error.status === 429) {
          // Rate limit error
          const waitTime = Math.pow(2, retries) * 1000;
          await new Promise(resolve => setTimeout(resolve, waitTime));
          retries++;
        } else {
          throw error;
        }
      }
    }
    throw new Error('Max retries exceeded');
  }}

export const openaiService = new OpenAI();