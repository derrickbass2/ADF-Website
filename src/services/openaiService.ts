// src/services/openaiService.ts
import OpenAI from 'openai';

class OpenAIService {
  private readonly client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true // Use with caution in production
    });
  }

  async generateText(prompt: string, model: string = 'gpt-3.5-turbo'): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        model: model,
        messages: [{ 
          role: 'user', 
          content: prompt 
        }]
      });

      return completion.choices[0].message.content ?? 'No response generated';
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

      return response.data[0].url ?? '';
    } catch (error) {
      console.error('OpenAI Image Generation Error:', error);
      throw error;
    }
  }

  // Add more methods as needed, like code generation, translation, etc.
  // Removed unused retryWithBackoff method to resolve the compile error.
}
// openaiService.ts
const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

export const fetchData = async () => {
  const response = await fetch(`${apiUrl}/data`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  });
  const data = await response.json();
  return data;
};
export const openaiService = new OpenAIService();