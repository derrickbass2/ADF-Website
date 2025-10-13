import React, { useState } from 'react';
import { openaiService } from '../../services/openaiService';
import LoadingSpinner from '../LoadingSpinner';
import styles from './AITextGenerator.module.scss';

const AITextGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt before generating text.');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const text = await openaiService.generateText(prompt);
      setGeneratedText(text);
    } catch (error) {
      console.error('Text generation failed', error);
      setError('Failed to generate text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>AI Text Generator</h2>
      <textarea 
        className={styles.promptInput}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
        rows={5}
      />
      
      {error && <div className={styles.errorMessage}>{error}</div>}
      
      <button 
        className={styles.generateButton} 
        onClick={handleGenerate} 
        disabled={isLoading || !prompt.trim()}
      >
        {isLoading ? 'Generating...' : 'Generate Text'}
      </button>
      
      {isLoading && (
        <div className={styles.loadingContainer}>
          <LoadingSpinner />
          <span>Processing your request...</span>
        </div>
      )}
      
      {generatedText && (
        <div className={styles.resultContainer}>
          <h3 className={styles.resultTitle}>Generated Text:</h3>
          <p className={styles.resultText}>{generatedText}</p>
        </div>
      )}
    </div>
  );
};

export default AITextGenerator;