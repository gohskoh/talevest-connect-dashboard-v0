import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      buffer: 'buffer',
      process: 'process/browser',
    },
  },
  define: {
    global: 'globalThis',
    'process.env': '{}',
  },
  optimizeDeps: {
    include: [
      'buffer', 
      'process',
      '@solana/web3.js',
      '@solana/spl-token',
      '@coral-xyz/anchor'
    ],
    esbuildOptions: {
      target: 'esnext',
      define: {
        global: 'globalThis',
      },
      plugins: [],
    },
  },
}));
