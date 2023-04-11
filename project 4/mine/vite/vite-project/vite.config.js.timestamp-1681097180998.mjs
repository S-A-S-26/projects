// vite.config.js
import { defineConfig } from "file:///E:/web%20win/cs50/project%204/mine/vite/vite-project/node_modules/vite/dist/node/index.js";
import react from "file:///E:/web%20win/cs50/project%204/mine/vite/vite-project/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  server: {
    proxy: {
      "/socialapp/": "http://127.0.0.10:8000"
      // 'update_profile':'http://127.0.0.10:8000/socialapp',
      // http://127.0.0.10:8000/socialapp/update_profile
      // '/socialapp': {
      //   target: 'http://127.0.0.10:8000',
      //   changeOrigin: true,
      //   secure: false,
      //   ws: true,
      //   rewrite: (path) => path.replace(/^\/socialapp/, "")
      // },
    }
  },
  plugins: [react()],
  build: {
    manifest: true,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "static/socialapp/[name].[hash].js",
        chunkFileNames: "static/socialapp/[name].[hash].js",
        assetFileNames: "static/socialapp/[name].[hash].[ext]"
      }
    },
    outDir: "./my"
  },
  base: process.env === "production" ? "/static/" : "/"
  // root:"./src",
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFx3ZWIgd2luXFxcXGNzNTBcXFxccHJvamVjdCA0XFxcXG1pbmVcXFxcdml0ZVxcXFx2aXRlLXByb2plY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHdlYiB3aW5cXFxcY3M1MFxcXFxwcm9qZWN0IDRcXFxcbWluZVxcXFx2aXRlXFxcXHZpdGUtcHJvamVjdFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovd2ViJTIwd2luL2NzNTAvcHJvamVjdCUyMDQvbWluZS92aXRlL3ZpdGUtcHJvamVjdC92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBzZXJ2ZXI6IHtcbiAgICBwcm94eToge1xuICAgICAgXCIvc29jaWFsYXBwL1wiOiBcImh0dHA6Ly8xMjcuMC4wLjEwOjgwMDBcIixcbiAgICAgIC8vICd1cGRhdGVfcHJvZmlsZSc6J2h0dHA6Ly8xMjcuMC4wLjEwOjgwMDAvc29jaWFsYXBwJyxcbiAgICAgIC8vIGh0dHA6Ly8xMjcuMC4wLjEwOjgwMDAvc29jaWFsYXBwL3VwZGF0ZV9wcm9maWxlXG4gICAgICAvLyAnL3NvY2lhbGFwcCc6IHtcbiAgICAgIC8vICAgdGFyZ2V0OiAnaHR0cDovLzEyNy4wLjAuMTA6ODAwMCcsXG4gICAgICAvLyAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgIC8vICAgc2VjdXJlOiBmYWxzZSxcbiAgICAgIC8vICAgd3M6IHRydWUsXG4gICAgICAvLyAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9zb2NpYWxhcHAvLCBcIlwiKVxuICAgICAgLy8gfSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIGJ1aWxkOiB7XG4gICAgbWFuaWZlc3Q6IHRydWUsXG4gICAgZW1wdHlPdXREaXI6IHRydWUsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcInN0YXRpYy9zb2NpYWxhcHAvW25hbWVdLltoYXNoXS5qc1wiLFxuICAgICAgICBjaHVua0ZpbGVOYW1lczogXCJzdGF0aWMvc29jaWFsYXBwL1tuYW1lXS5baGFzaF0uanNcIixcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6IFwic3RhdGljL3NvY2lhbGFwcC9bbmFtZV0uW2hhc2hdLltleHRdXCIsXG4gICAgICB9LFxuICAgIH0sXG4gICAgb3V0RGlyOiBcIi4vbXlcIixcbiAgfSxcbiAgYmFzZTogcHJvY2Vzcy5lbnYgPT09IFwicHJvZHVjdGlvblwiID8gXCIvc3RhdGljL1wiIDogXCIvXCIsXG4gIC8vIHJvb3Q6XCIuL3NyY1wiLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9WLFNBQVMsb0JBQW9CO0FBQ2pYLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxlQUFlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFVakI7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsT0FBTztBQUFBLElBQ0wsVUFBVTtBQUFBLElBQ1YsYUFBYTtBQUFBLElBQ2IsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsTUFBTSxRQUFRLFFBQVEsZUFBZSxhQUFhO0FBQUE7QUFFcEQsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
