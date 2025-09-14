// Polyfills must be imported FIRST
import { Buffer } from 'buffer'
import process from 'process'

// Set up polyfills globally before any other imports
if (typeof globalThis !== 'undefined') {
  globalThis.Buffer = Buffer
  globalThis.process = process
}
if (typeof window !== 'undefined') {
  ;(window as any).Buffer = Buffer
  ;(window as any).process = process
}

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
