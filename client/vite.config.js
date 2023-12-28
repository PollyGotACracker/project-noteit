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
        { find: "@assets", replacement: "/src/assets" },
        { find: "@components", replacement: "/src/components" },
        { find: "@data", replacement: "/src/data" },
        { find: "@hooks", replacement: "/src/hooks" },
        { find: "@layouts", replacement: "/src/layouts" },
        { find: "@libs", replacement: "/src/libs" },
        { find: "@pages", replacement: "/src/pages" },
        { find: "@recoils", replacement: "/src/recoils" },
        { find: "@services", replacement: "/src/services" },
        { find: "@styles", replacement: "/src/styles" },
        { find: "@utils", replacement: "/src/utils" },
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
