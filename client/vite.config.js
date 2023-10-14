import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), svgr()],
    server: {
      proxy: {
        "/server": {
          target: env.VITE_SERVER_URL,
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
        { find: "@contexts", replacement: "/src/contexts" },
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
  };
});
