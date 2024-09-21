import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base:'/app/',
  preview:{
    host:"0.0.0.0",
    port:4173
  },
  server:{
    host:"0.0.0.0",
    port:4174,
    watch:{
      usePolling:true
    }
  }

})