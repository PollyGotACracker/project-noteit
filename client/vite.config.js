import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  // server proxy for development
  // const isProduction = mode === "production";

  return {
    plugins: [react(), svgr()],
    server: {
      proxy: {
        "/server": {
          target: "http://localhost:3000",
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/server/, ""),
        },
      },
    },
    resolve: {
      alias: [
        { find: "@", replacement: "/src" },
        { find: "@services", replacement: "/src/common/services" },
        { find: "@assets", replacement: "/src/common/assets" },
        { find: "@components", replacement: "/src/common/components" },
        { find: "@constants", replacement: "/src/common/constants" },
        { find: "@contexts", replacement: "/src/common/contexts" },
        { find: "@data", replacement: "/src/common/data" },
        { find: "@features", replacement: "/src/features" },
        { find: "@hooks", replacement: "/src/common/hooks" },
        { find: "@layouts", replacement: "/src/common/layouts" },
        { find: "@libs", replacement: "/src/common/libs" },
        { find: "@recoils", replacement: "/src/common/recoils" },
        { find: "@styles", replacement: "/src/common/styles" },
        { find: "@utils", replacement: "/src/common/utils" },
      ],
    },
    build: {
      sourcemap: true,
      cssCodeSplit: true,
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
            reactRouter: ["react-router-dom"],
            reactQuery: ["react-query"],
            recoil: ["recoil"],
            reactChartjs2: ["react-chartjs-2"],
            framerMotion: ["framer-motion"],
            reactIcons: ["react-icons"],
            reactSpinners: ["react-spinners"],
            ckeditor_custom: ["ckeditor5-custom-build/build/ckeditor"],
            ckeditor: ["@ckeditor/ckeditor5-react"],
          },
        },
      },
    },
  };
});
