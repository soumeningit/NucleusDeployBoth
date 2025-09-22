import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  tailwind: {
    theme: {
      extend: {
        colors: {
          primary: '#4F46E5',
          secondary: '#10B981',
          neutral: '#1F2937',
        },
      },
    },
  },
})
