import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Жёстко задаём base под имя репозитория, чтобы GitHub Pages подхватил правильные пути
export default defineConfig({
  plugins: [react()],
  base: '/Register-Converter/', // ВАЖНО: слэши по краям и точный регистр
})
