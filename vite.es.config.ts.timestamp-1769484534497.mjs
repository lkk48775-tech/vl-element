// vite.es.config.ts
import { fileURLToPath, URL } from "node:url";
import { resolve } from "path";
import { defineConfig } from "file:///D:/%E5%89%8D%E7%AB%AF/Project/e-element/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/%E5%89%8D%E7%AB%AF/Project/e-element/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/%E5%89%8D%E7%AB%AF/Project/e-element/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import VueMacros from "file:///D:/%E5%89%8D%E7%AB%AF/Project/e-element/node_modules/unplugin-vue-macros/dist/index.mjs";
import dts from "file:///D:/%E5%89%8D%E7%AB%AF/Project/e-element/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\\u524D\u7AEF\\Project\\e-element";
var __vite_injected_original_import_meta_url = "file:///D:/%E5%89%8D%E7%AB%AF/Project/e-element/vite.es.config.ts";
var vite_es_config_default = defineConfig({
  plugins: [
    VueMacros.vite({
      plugins: {
        vue: vue(),
        vueJsx: vueJsx()
      }
    }),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      outDir: "dist/types"
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    outDir: "dist/es",
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "VElement",
      fileName: "v-element",
      formats: ["es"]
    },
    rollupOptions: {
      external: ["vue", "@fortawesome/fontawesome-svg-core", "@fortawesome/free-solid-svg-icons", "@fortawesome/vue-fontawesome", "async-validator", "@popperjs/core", "axios"],
      output: {
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === "style.css") {
            return "index.css";
          }
          return chunkInfo.name;
        }
      }
    }
  }
});
export {
  vite_es_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5lcy5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTUyNERcdTdBRUZcXFxcUHJvamVjdFxcXFxlLWVsZW1lbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFx1NTI0RFx1N0FFRlxcXFxQcm9qZWN0XFxcXGUtZWxlbWVudFxcXFx2aXRlLmVzLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovJUU1JTg5JThEJUU3JUFCJUFGL1Byb2plY3QvZS1lbGVtZW50L3ZpdGUuZXMuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcbmltcG9ydCBWdWVNYWNyb3MgZnJvbSAndW5wbHVnaW4tdnVlLW1hY3JvcydcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIFZ1ZU1hY3Jvcy52aXRlKHtcbiAgICAgIHBsdWdpbnM6IHtcbiAgICAgICAgdnVlOiB2dWUoKSxcbiAgICAgICAgdnVlSnN4OiB2dWVKc3goKSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgZHRzKHtcbiAgICAgIHRzY29uZmlnUGF0aDogJy4vdHNjb25maWcuYnVpbGQuanNvbicsXG4gICAgICBvdXREaXI6ICdkaXN0L3R5cGVzJ1xuICAgIH0pXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICB9XG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnZGlzdC9lcycsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcbiAgICAgIG5hbWU6ICdWRWxlbWVudCcsXG4gICAgICBmaWxlTmFtZTogJ3YtZWxlbWVudCcsXG4gICAgICBmb3JtYXRzOiBbJ2VzJ11cbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbJ3Z1ZScsICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnLCAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJywgJ0Bmb3J0YXdlc29tZS92dWUtZm9udGF3ZXNvbWUnLCAnYXN5bmMtdmFsaWRhdG9yJywgJ0Bwb3BwZXJqcy9jb3JlJywgJ2F4aW9zJ10sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChjaHVua0luZm8pID0+IHtcbiAgICAgICAgICBpZiAoY2h1bmtJbmZvLm5hbWUgPT09ICdzdHlsZS5jc3MnKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2luZGV4LmNzcydcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGNodW5rSW5mby5uYW1lIGFzIHN0cmluZ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxUixTQUFTLGVBQWUsV0FBVztBQUN4VCxTQUFTLGVBQWU7QUFDeEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGVBQWU7QUFDdEIsT0FBTyxTQUFTO0FBTmhCLElBQU0sbUNBQW1DO0FBQXVILElBQU0sMkNBQTJDO0FBU2pOLElBQU8seUJBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLFVBQVUsS0FBSztBQUFBLE1BQ2IsU0FBUztBQUFBLFFBQ1AsS0FBSyxJQUFJO0FBQUEsUUFDVCxRQUFRLE9BQU87QUFBQSxNQUNqQjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsSUFBSTtBQUFBLE1BQ0YsY0FBYztBQUFBLE1BQ2QsUUFBUTtBQUFBLElBQ1YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDaEI7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxPQUFPLHFDQUFxQyxxQ0FBcUMsZ0NBQWdDLG1CQUFtQixrQkFBa0IsT0FBTztBQUFBLE1BQ3hLLFFBQVE7QUFBQSxRQUNOLGdCQUFnQixDQUFDLGNBQWM7QUFDN0IsY0FBSSxVQUFVLFNBQVMsYUFBYTtBQUNsQyxtQkFBTztBQUFBLFVBQ1Q7QUFDQSxpQkFBTyxVQUFVO0FBQUEsUUFDbkI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
