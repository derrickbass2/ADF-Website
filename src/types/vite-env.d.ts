/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly FLASK_ENV: string;
  readonly SECRET_KEY: string;
  readonly DATABASE_URL: string;
  readonly SENTRY_DSN: string;
  readonly REDIS_URL: string;
  readonly VITE_OPENAI_API_KEY: string;
  readonly GITHUB_OAUTH_TOKEN: string;
  readonly DEBUG: string;
  readonly TESTING: string;
  // Add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}