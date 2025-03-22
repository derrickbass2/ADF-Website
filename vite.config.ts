// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import { sentryVitePlugin } from "@sentry/vite-plugin";
import svgr from 'vite-plugin-svgr';
import legacy from '@vitejs/plugin-legacy';
import checker from 'vite-plugin-checker';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode`
  const env = loadEnv(mode, process.cwd(), '');

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
      svgr(),

      // Browser compatibility
      legacy({
        targets: ['defaults', 'not IE 11']
      }),

      // Type checking
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"'
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
        disable: false,
        threshold: 10240, // 10 KB
        algorithm: 'gzip',
        ext: '.gz',
        deleteOriginFile: false
      }),

      // Sentry for error tracking (optional, requires setup)
      sentryVitePlugin({
        org: env.SENTRY_ORG,
        project: env.SENTRY_PROJECT,
        authToken: env.SENTRY_AUTH_TOKEN,
        sourcemaps: {
          assets: ['./dist/**/*.{js,map}'],
        },
        release: {
          name: env.npm_package_version,
          uploadLegacySourcemaps: true,
        },
      })
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
        generateScopedName: '[name]__[local]___[hash:base64:5]'
      },
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/styles/variables.scss" as *;
            @use "@/styles/mixins.scss" as *;
            @use "sass:color";
          `,
          // Enable source maps for better debugging
          sourceMap: true
        }
      },
      devSourcemap: true
    },

    // Build Configuration
    build: {
      // Improve build performance
      incremental: true,
      
      // Chunk splitting strategy
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
            if (id.includes('/src/components/')) {
              return 'components';
            }
            if (id.includes('/src/pages/')) {
              return 'pages';
            }
          }
        }
      },

      // Minification and optimization
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      },

      // Source map generation
      sourcemap: mode === 'production' ? 'hidden' : true
    },

    // Development Server Configuration
    server: {
      port: Number(env.VITE_PORT) || 3000,
      open: true,
      https: env.HTTPS === 'true',
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
        '@reduxjs/toolkit'
      ],
      // Exclude packages from pre-bundling
      exclude: ['@sentry/react']
    }
  };
});