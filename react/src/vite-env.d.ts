/// <reference types="vite/client" />

export interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_ANON_KEY: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
