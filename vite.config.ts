import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base по умолчанию — корень домена (подходит для converter.stocksi.ru)
const base = (process.env.VITE_BASE && process.env.VITE_BASE.trim() !== '')
  ? process.env.VITE_BASE
  : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
