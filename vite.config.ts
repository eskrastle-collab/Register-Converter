import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Жёстко фиксируем base под имя репозитория
export default defineConfig({
  plugins: [react()],
  base: '/Register-Converter/', // ВАЖНО: со слешами по краям и с учётом регистра
})
