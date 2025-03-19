// src/components/AITextGenerator/index.tsx
import React, { useState } from 'react';
import { openaiService } from '../../services/openaiService';

const AITextGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const text = await openaiService.generateText(prompt);
      setGeneratedText(text);
    } catch (error) {
      console.error('Text generation failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <textarea 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
      />
      <button onClick={handleGenerate} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate'}
      </button>
      {generatedText && (
        <div>
          <h3>Generated Text:</h3>
          <p>{generatedText}</p>
        </div>
      )}
    </div>
  );
};

export default AITextGenerator;