// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/lnyiyao/sass/chrome-extension-template/node_modules/.pnpm/vite@5.4.10_@types+node@22.9.0/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/lnyiyao/sass/chrome-extension-template/node_modules/.pnpm/@vitejs+plugin-vue@5.1.5_vite@5.4.10_@types+node@22.9.0__vue@3.5.12_typescript@5.6.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { crx } from "file:///D:/lnyiyao/sass/chrome-extension-template/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.28/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.config.ts
import { defineManifest } from "file:///D:/lnyiyao/sass/chrome-extension-template/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.28/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// package.json
var package_default = {
  name: "chrome-extension-template",
  description: "\u8FD9\u662F\u4E00\u4E2A\u8C37\u6B4C\u6D4F\u89C8\u5668\u6269\u5C55\u6A21\u677F\uFF0C\u57FA\u4E8EVite+Vue3+TypeScript\u5F00\u53D1",
  version: "0.0.1",
  private: true,
  type: "module",
  scripts: {
    dev: "vite",
    build: 'run-p "build-only {@}" --',
    preview: "vite preview",
    "build-only": "vite build",
    "type-check": "vue-tsc --build --force",
    "lint:oxlint": "oxlint . --fix -D correctness --ignore-path .gitignore",
    "lint:eslint": "eslint . --fix",
    lint: "run-s lint:*",
    format: "prettier --write src/",
    "version:update": "bumpp --no-commit --no-tag --no-push"
  },
  dependencies: {
    "crypto-js": "^4.2.0",
    "element-plus": "^2.8.8",
    ky: "^1.7.2",
    pinia: "^2.2.6",
    vue: "^3.5.12",
    "vue-json-pretty": "^2.4.0",
    "vue-router": "^4.4.5"
  },
  devDependencies: {
    "@crxjs/vite-plugin": "2.0.0-beta.28",
    "@tsconfig/node22": "^22.0.0",
    "@types/chrome": "^0.0.280",
    "@types/node": "^22.9.0",
    "@vitejs/plugin-vue": "^5.1.4",
    "@vue/eslint-config-prettier": "^10.1.0",
    "@vue/eslint-config-typescript": "^14.1.3",
    "@vue/tsconfig": "^0.5.1",
    bumpp: "^9.8.1",
    eslint: "^9.14.0",
    "eslint-plugin-oxlint": "^0.11.0",
    "eslint-plugin-vue": "^9.30.0",
    "npm-run-all2": "^7.0.1",
    oxlint: "^0.11.0",
    prettier: "^3.3.3",
    typescript: "~5.6.3",
    "unplugin-auto-import": "^0.18.4",
    vite: "^5.4.10",
    "vue-tsc": "^2.1.10"
  }
};

// manifest.config.ts
var manifest_config_default = defineManifest(async (env) => {
  return {
    manifest_version: 3,
    name: env.mode === "production" ? package_default.name : `[dev] ${package_default.name}`,
    description: package_default.description,
    version: package_default.version,
    minimum_chrome_version: "116",
    icons: {
      "16": "images/icons/icon-16.png",
      "32": "images/icons/icon-32.png",
      "48": "images/icons/icon-48.png",
      "128": "images/icons/icon-128.png"
    },
    permissions: [
      "sidePanel",
      "tabs",
      "storage",
      "nativeMessaging",
      "notifications",
      "contextMenus",
      "activeTab",
      "scripting"
    ],
    content_scripts: [
      {
        js: ["src/pages/content/main.ts"],
        matches: ["https://www.google.com/*"]
      }
    ],
    background: {
      service_worker: "src/background/background.ts",
      type: "module"
    },
    action: {
      default_popup: "src/pages/popup/index.html"
    },
    side_panel: {
      default_path: "src/pages/side-panel/index.html"
    },
    devtools_page: "src/pages/devtool/index.html",
    web_accessible_resources: [
      {
        resources: [
          "src/pages/404/index.html",
          "images/notifications-icon/error.png",
          "images/notifications-icon/warning.png",
          "favicon.ico"
        ],
        matches: ["<all_urls>"]
      }
    ]
  };
});

// vite.config.ts
import AutoImport from "file:///D:/lnyiyao/sass/chrome-extension-template/node_modules/.pnpm/unplugin-auto-import@0.18.4_@vueuse+core@9.13.0_vue@3.5.12_typescript@5.6.3___rollup@4.25.0/node_modules/unplugin-auto-import/dist/vite.js";
var __vite_injected_original_import_meta_url = "file:///D:/lnyiyao/sass/chrome-extension-template/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    crx({ manifest: manifest_config_default }),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      dts: "types/auto-imports.d.ts",
      eslintrc: {
        enabled: true,
        filepath: "./.eslintrc-auto-import.cjs",
        globalsPropValue: true
      }
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      "@popup": fileURLToPath(new URL("./src/pages/popup", __vite_injected_original_import_meta_url)),
      "@side-panel": fileURLToPath(new URL("./src/pages/side-panel/index.html", __vite_injected_original_import_meta_url))
    }
  },
  // HACK: https://github.com/crxjs/chrome-extension-tools/issues/696
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173
    }
  },
  build: {
    rollupOptions: {
      input: {
        popup: "src/pages/popup/index.html",
        "side-panel": "src/pages/side-panel/index.html",
        404: "src/pages/404/index.html",
        devtool: "src/pages/devtool/index.html",
        "devtool-panel": "src/pages/devtool-panel/index.html"
      },
      output: {
        assetFileNames: "assets/[name]-[hash].[ext]",
        // 静态资源
        chunkFileNames: "js/[name]-[hash].js",
        // 代码分割中产生的 chunk
        entryFileNames: "js/[name]-[hash].js"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuY29uZmlnLnRzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGxueWl5YW9cXFxcc2Fzc1xcXFxjaHJvbWUtZXh0ZW5zaW9uLXRlbXBsYXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxsbnlpeWFvXFxcXHNhc3NcXFxcY2hyb21lLWV4dGVuc2lvbi10ZW1wbGF0ZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovbG55aXlhby9zYXNzL2Nocm9tZS1leHRlbnNpb24tdGVtcGxhdGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tIFwibm9kZTp1cmxcIjtcclxuXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xyXG5pbXBvcnQgeyBjcnggfSBmcm9tIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI7XHJcbmltcG9ydCBkZWZpbmVNYW5pZmVzdCBmcm9tIFwiLi9tYW5pZmVzdC5jb25maWdcIjtcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSBcInVucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGVcIjtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZS5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG5cdHBsdWdpbnM6IFtcclxuXHRcdHZ1ZSgpLFxyXG5cdFx0Y3J4KHsgbWFuaWZlc3Q6IGRlZmluZU1hbmlmZXN0IH0pLFxyXG5cdFx0QXV0b0ltcG9ydCh7XHJcblx0XHRcdGltcG9ydHM6IFtcInZ1ZVwiLCBcInZ1ZS1yb3V0ZXJcIiwgXCJwaW5pYVwiXSxcclxuXHRcdFx0ZHRzOiBcInR5cGVzL2F1dG8taW1wb3J0cy5kLnRzXCIsXHJcblx0XHRcdGVzbGludHJjOiB7XHJcblx0XHRcdFx0ZW5hYmxlZDogdHJ1ZSxcclxuXHRcdFx0XHRmaWxlcGF0aDogXCIuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5janNcIixcclxuXHRcdFx0XHRnbG9iYWxzUHJvcFZhbHVlOiB0cnVlXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XSxcclxuXHRyZXNvbHZlOiB7XHJcblx0XHRhbGlhczoge1xyXG5cdFx0XHRcIkBcIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmNcIiwgaW1wb3J0Lm1ldGEudXJsKSksXHJcblx0XHRcdFwiQHBvcHVwXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjL3BhZ2VzL3BvcHVwXCIsIGltcG9ydC5tZXRhLnVybCkpLFxyXG5cdFx0XHRcIkBzaWRlLXBhbmVsXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjL3BhZ2VzL3NpZGUtcGFuZWwvaW5kZXguaHRtbFwiLCBpbXBvcnQubWV0YS51cmwpKVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0Ly8gSEFDSzogaHR0cHM6Ly9naXRodWIuY29tL2NyeGpzL2Nocm9tZS1leHRlbnNpb24tdG9vbHMvaXNzdWVzLzY5NlxyXG5cdHNlcnZlcjoge1xyXG5cdFx0cG9ydDogNTE3MyxcclxuXHRcdHN0cmljdFBvcnQ6IHRydWUsXHJcblx0XHRobXI6IHtcclxuXHRcdFx0cG9ydDogNTE3M1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0YnVpbGQ6IHtcclxuXHRcdHJvbGx1cE9wdGlvbnM6IHtcclxuXHRcdFx0aW5wdXQ6IHtcclxuXHRcdFx0XHRwb3B1cDogXCJzcmMvcGFnZXMvcG9wdXAvaW5kZXguaHRtbFwiLFxyXG5cdFx0XHRcdFwic2lkZS1wYW5lbFwiOiBcInNyYy9wYWdlcy9zaWRlLXBhbmVsL2luZGV4Lmh0bWxcIixcclxuXHRcdFx0XHQ0MDQ6IFwic3JjL3BhZ2VzLzQwNC9pbmRleC5odG1sXCIsXHJcblx0XHRcdFx0ZGV2dG9vbDogXCJzcmMvcGFnZXMvZGV2dG9vbC9pbmRleC5odG1sXCIsXHJcblx0XHRcdFx0XCJkZXZ0b29sLXBhbmVsXCI6IFwic3JjL3BhZ2VzL2RldnRvb2wtcGFuZWwvaW5kZXguaHRtbFwiXHJcblx0XHRcdH0sXHJcblx0XHRcdG91dHB1dDoge1xyXG5cdFx0XHRcdGFzc2V0RmlsZU5hbWVzOiBcImFzc2V0cy9bbmFtZV0tW2hhc2hdLltleHRdXCIsIC8vIFx1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MFxyXG5cdFx0XHRcdGNodW5rRmlsZU5hbWVzOiBcImpzL1tuYW1lXS1baGFzaF0uanNcIiwgLy8gXHU0RUUzXHU3ODAxXHU1MjA2XHU1MjcyXHU0RTJEXHU0RUE3XHU3NTFGXHU3Njg0IGNodW5rXHJcblx0XHRcdFx0ZW50cnlGaWxlTmFtZXM6IFwianMvW25hbWVdLVtoYXNoXS5qc1wiXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGxueWl5YW9cXFxcc2Fzc1xcXFxjaHJvbWUtZXh0ZW5zaW9uLXRlbXBsYXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxsbnlpeWFvXFxcXHNhc3NcXFxcY2hyb21lLWV4dGVuc2lvbi10ZW1wbGF0ZVxcXFxtYW5pZmVzdC5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2xueWl5YW8vc2Fzcy9jaHJvbWUtZXh0ZW5zaW9uLXRlbXBsYXRlL21hbmlmZXN0LmNvbmZpZy50c1wiOy8qXHJcbiAqIEBBdXRob3I6IG11bGluZ3l1ZXJcclxuICogQERhdGU6IDIwMjQtMTEtMTEgMTE6NTg6MDRcclxuICogQExhc3RFZGl0VGltZTogMjAyNC0xMS0yNiAwOToxNTozMFxyXG4gKiBATGFzdEVkaXRvcnM6IG11bGluZ3l1ZXJcclxuICogQERlc2NyaXB0aW9uOiBtYW5pZmVzdCBcdTkxNERcdTdGNkVcdTY1ODdcdTRFRjZcclxuICogQEZpbGVQYXRoOiBcXGNocm9tZS1leHRlbnNpb24tdGVtcGxhdGVcXG1hbmlmZXN0LmNvbmZpZy50c1xyXG4gKiBcdTYwMEVcdTRFNDhcdTUzRUZcdTgwRkRcdTRGMUFcdTY3MDlidWdcdUZGMDFcdUZGMDFcdUZGMDFcclxuICovXHJcbmltcG9ydCB7IGRlZmluZU1hbmlmZXN0IH0gZnJvbSBcIkBjcnhqcy92aXRlLXBsdWdpblwiO1xyXG5pbXBvcnQgcGFja2FnZUpzb24gZnJvbSBcIi4vcGFja2FnZS5qc29uXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVNYW5pZmVzdChhc3luYyAoZW52KSA9PiB7XHJcblx0cmV0dXJuIHtcclxuXHRcdG1hbmlmZXN0X3ZlcnNpb246IDMsXHJcblx0XHRuYW1lOiBlbnYubW9kZSA9PT0gXCJwcm9kdWN0aW9uXCIgPyBwYWNrYWdlSnNvbi5uYW1lIDogYFtkZXZdICR7cGFja2FnZUpzb24ubmFtZX1gLFxyXG5cdFx0ZGVzY3JpcHRpb246IHBhY2thZ2VKc29uLmRlc2NyaXB0aW9uLFxyXG5cdFx0dmVyc2lvbjogcGFja2FnZUpzb24udmVyc2lvbixcclxuXHRcdG1pbmltdW1fY2hyb21lX3ZlcnNpb246IFwiMTE2XCIsXHJcblx0XHRpY29uczoge1xyXG5cdFx0XHRcIjE2XCI6IFwiaW1hZ2VzL2ljb25zL2ljb24tMTYucG5nXCIsXHJcblx0XHRcdFwiMzJcIjogXCJpbWFnZXMvaWNvbnMvaWNvbi0zMi5wbmdcIixcclxuXHRcdFx0XCI0OFwiOiBcImltYWdlcy9pY29ucy9pY29uLTQ4LnBuZ1wiLFxyXG5cdFx0XHRcIjEyOFwiOiBcImltYWdlcy9pY29ucy9pY29uLTEyOC5wbmdcIlxyXG5cdFx0fSxcclxuXHRcdHBlcm1pc3Npb25zOiBbXHJcblx0XHRcdFwic2lkZVBhbmVsXCIsXHJcblx0XHRcdFwidGFic1wiLFxyXG5cdFx0XHRcInN0b3JhZ2VcIixcclxuXHRcdFx0XCJuYXRpdmVNZXNzYWdpbmdcIixcclxuXHRcdFx0XCJub3RpZmljYXRpb25zXCIsXHJcblx0XHRcdFwiY29udGV4dE1lbnVzXCIsXHJcblx0XHRcdFwiYWN0aXZlVGFiXCIsXHJcblx0XHRcdFwic2NyaXB0aW5nXCJcclxuXHRcdF0sXHJcblx0XHRjb250ZW50X3NjcmlwdHM6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGpzOiBbXCJzcmMvcGFnZXMvY29udGVudC9tYWluLnRzXCJdLFxyXG5cdFx0XHRcdG1hdGNoZXM6IFtcImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vKlwiXVxyXG5cdFx0XHR9XHJcblx0XHRdLFxyXG5cdFx0YmFja2dyb3VuZDoge1xyXG5cdFx0XHRzZXJ2aWNlX3dvcmtlcjogXCJzcmMvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLnRzXCIsXHJcblx0XHRcdHR5cGU6IFwibW9kdWxlXCJcclxuXHRcdH0sXHJcblx0XHRhY3Rpb246IHtcclxuXHRcdFx0ZGVmYXVsdF9wb3B1cDogXCJzcmMvcGFnZXMvcG9wdXAvaW5kZXguaHRtbFwiXHJcblx0XHR9LFxyXG5cdFx0c2lkZV9wYW5lbDoge1xyXG5cdFx0XHRkZWZhdWx0X3BhdGg6IFwic3JjL3BhZ2VzL3NpZGUtcGFuZWwvaW5kZXguaHRtbFwiXHJcblx0XHR9LFxyXG5cdFx0ZGV2dG9vbHNfcGFnZTogXCJzcmMvcGFnZXMvZGV2dG9vbC9pbmRleC5odG1sXCIsXHJcblx0XHR3ZWJfYWNjZXNzaWJsZV9yZXNvdXJjZXM6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHJlc291cmNlczogW1xyXG5cdFx0XHRcdFx0XCJzcmMvcGFnZXMvNDA0L2luZGV4Lmh0bWxcIixcclxuXHRcdFx0XHRcdFwiaW1hZ2VzL25vdGlmaWNhdGlvbnMtaWNvbi9lcnJvci5wbmdcIixcclxuXHRcdFx0XHRcdFwiaW1hZ2VzL25vdGlmaWNhdGlvbnMtaWNvbi93YXJuaW5nLnBuZ1wiLFxyXG5cdFx0XHRcdFx0XCJmYXZpY29uLmljb1wiXHJcblx0XHRcdFx0XSxcclxuXHRcdFx0XHRtYXRjaGVzOiBbXCI8YWxsX3VybHM+XCJdXHJcblx0XHRcdH1cclxuXHRcdF1cclxuXHR9O1xyXG59KTtcclxuIiwgIntcblx0XCJuYW1lXCI6IFwiY2hyb21lLWV4dGVuc2lvbi10ZW1wbGF0ZVwiLFxuXHRcImRlc2NyaXB0aW9uXCI6IFwiXHU4RkQ5XHU2NjJGXHU0RTAwXHU0RTJBXHU4QzM3XHU2QjRDXHU2RDRGXHU4OUM4XHU1NjY4XHU2MjY5XHU1QzU1XHU2QTIxXHU2NzdGXHVGRjBDXHU1N0ZBXHU0RThFVml0ZStWdWUzK1R5cGVTY3JpcHRcdTVGMDBcdTUzRDFcIixcblx0XCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIixcblx0XCJwcml2YXRlXCI6IHRydWUsXG5cdFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuXHRcInNjcmlwdHNcIjoge1xuXHRcdFwiZGV2XCI6IFwidml0ZVwiLFxuXHRcdFwiYnVpbGRcIjogXCJydW4tcCBcXFwiYnVpbGQtb25seSB7QH1cXFwiIC0tXCIsXG5cdFx0XCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCIsXG5cdFx0XCJidWlsZC1vbmx5XCI6IFwidml0ZSBidWlsZFwiLFxuXHRcdFwidHlwZS1jaGVja1wiOiBcInZ1ZS10c2MgLS1idWlsZCAtLWZvcmNlXCIsXG5cdFx0XCJsaW50Om94bGludFwiOiBcIm94bGludCAuIC0tZml4IC1EIGNvcnJlY3RuZXNzIC0taWdub3JlLXBhdGggLmdpdGlnbm9yZVwiLFxuXHRcdFwibGludDplc2xpbnRcIjogXCJlc2xpbnQgLiAtLWZpeFwiLFxuXHRcdFwibGludFwiOiBcInJ1bi1zIGxpbnQ6KlwiLFxuXHRcdFwiZm9ybWF0XCI6IFwicHJldHRpZXIgLS13cml0ZSBzcmMvXCIsXG5cdFx0XCJ2ZXJzaW9uOnVwZGF0ZVwiOiBcImJ1bXBwIC0tbm8tY29tbWl0IC0tbm8tdGFnIC0tbm8tcHVzaFwiXG5cdH0sXG5cdFwiZGVwZW5kZW5jaWVzXCI6IHtcblx0XHRcImNyeXB0by1qc1wiOiBcIl40LjIuMFwiLFxuXHRcdFwiZWxlbWVudC1wbHVzXCI6IFwiXjIuOC44XCIsXG5cdFx0XCJreVwiOiBcIl4xLjcuMlwiLFxuXHRcdFwicGluaWFcIjogXCJeMi4yLjZcIixcblx0XHRcInZ1ZVwiOiBcIl4zLjUuMTJcIixcblx0XHRcInZ1ZS1qc29uLXByZXR0eVwiOiBcIl4yLjQuMFwiLFxuXHRcdFwidnVlLXJvdXRlclwiOiBcIl40LjQuNVwiXG5cdH0sXG5cdFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcblx0XHRcIkBjcnhqcy92aXRlLXBsdWdpblwiOiBcIjIuMC4wLWJldGEuMjhcIixcblx0XHRcIkB0c2NvbmZpZy9ub2RlMjJcIjogXCJeMjIuMC4wXCIsXG5cdFx0XCJAdHlwZXMvY2hyb21lXCI6IFwiXjAuMC4yODBcIixcblx0XHRcIkB0eXBlcy9ub2RlXCI6IFwiXjIyLjkuMFwiLFxuXHRcdFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjUuMS40XCIsXG5cdFx0XCJAdnVlL2VzbGludC1jb25maWctcHJldHRpZXJcIjogXCJeMTAuMS4wXCIsXG5cdFx0XCJAdnVlL2VzbGludC1jb25maWctdHlwZXNjcmlwdFwiOiBcIl4xNC4xLjNcIixcblx0XHRcIkB2dWUvdHNjb25maWdcIjogXCJeMC41LjFcIixcblx0XHRcImJ1bXBwXCI6IFwiXjkuOC4xXCIsXG5cdFx0XCJlc2xpbnRcIjogXCJeOS4xNC4wXCIsXG5cdFx0XCJlc2xpbnQtcGx1Z2luLW94bGludFwiOiBcIl4wLjExLjBcIixcblx0XHRcImVzbGludC1wbHVnaW4tdnVlXCI6IFwiXjkuMzAuMFwiLFxuXHRcdFwibnBtLXJ1bi1hbGwyXCI6IFwiXjcuMC4xXCIsXG5cdFx0XCJveGxpbnRcIjogXCJeMC4xMS4wXCIsXG5cdFx0XCJwcmV0dGllclwiOiBcIl4zLjMuM1wiLFxuXHRcdFwidHlwZXNjcmlwdFwiOiBcIn41LjYuM1wiLFxuXHRcdFwidW5wbHVnaW4tYXV0by1pbXBvcnRcIjogXCJeMC4xOC40XCIsXG5cdFx0XCJ2aXRlXCI6IFwiXjUuNC4xMFwiLFxuXHRcdFwidnVlLXRzY1wiOiBcIl4yLjEuMTBcIlxuXHR9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFULFNBQVMsZUFBZSxXQUFXO0FBRXhWLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixTQUFTLFdBQVc7OztBQ0twQixTQUFTLHNCQUFzQjs7O0FDVC9CO0FBQUEsRUFDQyxNQUFRO0FBQUEsRUFDUixhQUFlO0FBQUEsRUFDZixTQUFXO0FBQUEsRUFDWCxTQUFXO0FBQUEsRUFDWCxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsSUFDVixLQUFPO0FBQUEsSUFDUCxPQUFTO0FBQUEsSUFDVCxTQUFXO0FBQUEsSUFDWCxjQUFjO0FBQUEsSUFDZCxjQUFjO0FBQUEsSUFDZCxlQUFlO0FBQUEsSUFDZixlQUFlO0FBQUEsSUFDZixNQUFRO0FBQUEsSUFDUixRQUFVO0FBQUEsSUFDVixrQkFBa0I7QUFBQSxFQUNuQjtBQUFBLEVBQ0EsY0FBZ0I7QUFBQSxJQUNmLGFBQWE7QUFBQSxJQUNiLGdCQUFnQjtBQUFBLElBQ2hCLElBQU07QUFBQSxJQUNOLE9BQVM7QUFBQSxJQUNULEtBQU87QUFBQSxJQUNQLG1CQUFtQjtBQUFBLElBQ25CLGNBQWM7QUFBQSxFQUNmO0FBQUEsRUFDQSxpQkFBbUI7QUFBQSxJQUNsQixzQkFBc0I7QUFBQSxJQUN0QixvQkFBb0I7QUFBQSxJQUNwQixpQkFBaUI7QUFBQSxJQUNqQixlQUFlO0FBQUEsSUFDZixzQkFBc0I7QUFBQSxJQUN0QiwrQkFBK0I7QUFBQSxJQUMvQixpQ0FBaUM7QUFBQSxJQUNqQyxpQkFBaUI7QUFBQSxJQUNqQixPQUFTO0FBQUEsSUFDVCxRQUFVO0FBQUEsSUFDVix3QkFBd0I7QUFBQSxJQUN4QixxQkFBcUI7QUFBQSxJQUNyQixnQkFBZ0I7QUFBQSxJQUNoQixRQUFV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
