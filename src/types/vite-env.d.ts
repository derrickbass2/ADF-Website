/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly FLASK_ENV: string;
  readonly SECRET_KEY: string;
  readonly DATABASE_URL: string;
  readonly REDIS_URL: string;
  readonly VITE_OPENAI_API_KEY: string;
  readonly GITHUB_OAUTH_TOKEN: string;
  readonly DEBUG: string;
  readonly TESTING: string;
  readonly VITE_API_URL: string;
}


interface ImportMeta {
  readonly env: ImportMetaEnv;
}