import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import rollupReplace from "@rollup/plugin-replace";

export default defineConfig({
  base: "/uec-central/",
  plugins: [
    rollupReplace({
      preventAssignment: true,
    }),
    react(),
  ],
  resolve: process.env.USE_SOURCE
    ? {
        alias: {
          "~bootstrap": path.resolve(
            __dirname,
            'node_modules/bootstrap'
          ),
          "@remix-run/router": path.resolve(
            __dirname,
            "../../packages/router/index.ts"
          ),
          "react-router": path.resolve(
            __dirname,
            "../../packages/react-router/index.ts"
          ),
          "react-router-dom": path.resolve(
            __dirname,
            "../../packages/react-router-dom/index.tsx"
          ),
          
        },
      }
    : {},
});
