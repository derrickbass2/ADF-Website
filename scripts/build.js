#!/usr/bin/env node
const { execSync } = require('child_process');

try {
  console.log('Starting type checking...');
  execSync('tsc --noEmit', { stdio: 'inherit' });
  
  console.log('Building project...');
  execSync('vite build', { stdio: 'inherit' });
  
  console.log('Build successful! 🎉');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}