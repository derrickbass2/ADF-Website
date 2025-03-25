/// <reference types="node" />
// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import svgr from 'vite-plugin-svgr';
import legacy from '@vitejs/plugin-legacy';
import checker from 'vite-plugin-checker';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode`
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';

  return {
    // Base configuration
    base: env.VITE_BASE_URL || '/',
    
    // Plugins
    plugins: [
      // React plugin
      react({
        // Use React automatic runtime
        jsxRuntime: 'automatic',
        // Babel configuration for advanced transformations
        babel: {
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }]
          ]
        }
      }),

      // SVG support as React components
      svgr({
        // Options: https://react-svgr.com/docs/options/
        svgrOptions: {
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                    cleanupIDs: false
                  }
                }
              }
            ]
          }
        }
      }),

      // Browser compatibility
      legacy({
        targets: ['defaults', 'not IE 11'],
        modernPolyfills: ['es.promise.finally']
      }),

      // Type checking
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx}" --max-warnings 0'
        }
      }),

      // Performance analysis
      visualizer({
        filename: './stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true
      }),

      // Compression
      viteCompression({
        verbose: true,
        disable: !isProduction,
        threshold: 10240, // 10 KB
        algorithm: 'gzip',
        ext: '.gz',
        deleteOriginFile: false
      }),

      // Progressive Web App support
      // Removed invalid VitePWA usage as it doesn't return a plugin
    ],
    
    // Resolve configuration
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@models': path.resolve(__dirname, './src/models'),
        '@services': path.resolve(__dirname, './src/services'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@hooks': path.resolve(__dirname, './src/hooks')
      },
      // Explicitly define extensions to resolve
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss']
    },

    // CSS Configuration
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
        generateScopedName: isProduction 
          ? '[hash:base64:5]' 
          : '[name]__[local]___[hash:base64:5]'
      },
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/styles/variables.scss" as *;
            @use "@/styles/mixins.scss" as *;
            @use "sass:color";
            @use "sass:math";
          `,
          // Enable source maps for better debugging
          sourceMap: !isProduction
        }
      },
      devSourcemap: !isProduction
    },

    // Build Configuration
    build: {
      // Improve build performance
      incremental: true,
      // Removed invalid incremental property
      // Chunk splitting strategy
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              return 'vendor';
            } else if (id.includes('/src/components/')) {
              return 'components';
            } else if (id.includes('/src/pages/')) {
              return 'pages';
            } else if (id.includes('/src/services/')) {
              return 'services';
            }
            return undefined;
          }
        }
      },

      // Minification and optimization
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction
        },
        format: {
          comments: false
        }
      },

      // Source map generation
      sourcemap: isProduction ? 'hidden' : true
    },

    // Development Server Configuration
    server: {
      port: Number(env.VITE_PORT) || 3000,
      open: true,
      https: env.HTTPS === 'true' ? { } : false,
      proxy: {
        // API proxy configuration
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false
        }
      },
      // Enable CORS
      cors: true
    },

    // Preview Configuration
    preview: {
      port: Number(env.VITE_PREVIEW_PORT) || 4000
    },
    
    // Optimizations
    optimizeDeps: {
      include: [
        'react', 
        'react-dom', 
        'react-router-dom', 
        '@reduxjs/toolkit',
        'framer-motion'
      ]
    }
  };
});
// Removed unused VitePWA function
