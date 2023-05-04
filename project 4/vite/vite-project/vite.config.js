import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/socialapp/": "http://127.0.0.10:8000",
      // 'update_profile':'http://127.0.0.10:8000/socialapp',
      // http://127.0.0.10:8000/socialapp/update_profile
      // '/socialapp': {
      //   target: 'http://127.0.0.10:8000',
      //   changeOrigin: true,
      //   secure: false,
      //   ws: true,
      //   rewrite: (path) => path.replace(/^\/socialapp/, "")
      // },
    },
  },
  plugins: [react()],
  build: {
    manifest: true,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "static/socialapp/[name].[hash].js",
        chunkFileNames: "static/socialapp/[name].[hash].js",
        assetFileNames: "static/socialapp/[name].[hash].[ext]",
      },
    },
    outDir: "./my",
  },
  base: process.env === "production" ? "/static/" : "/",
  // root:"./src",
});
