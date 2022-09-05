import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/

const name = "Idle Pixel Fixed";
const namespace = "com.kape142.idlepixelfixed";
const version = "0.3.1";
const description = "Extension to improve the experience of Idle Pixel";
const author = "kape142";
const match = "https://idle-pixel.com/login/play/*";
const grant = "none";
const requires = [
  "https://unpkg.com/react@17/umd/react.production.min.js",
  "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
  "https://unpkg.com/@reduxjs/toolkit@1.8.5/dist/redux-toolkit.umd.min.js",
  "https://unpkg.com/react-redux@8.0.2/dist/react-redux.js",
];

const fullText = `// ==UserScript==
// @name         ${name}
// @namespace    ${namespace}
// @version      ${version}
// @description  ${description}
// @author       ${author}
// @match        ${match}
// @grant        ${grant}
${requires.reduce((acc, cur) => acc + `// @require      ${cur}\n`, "")}
// ==/UserScript==
`;

export default defineConfig({
  plugins: [],
  esbuild: {
    legalComments: "inline",
    banner: fullText,
  },
  build: {
    outDir: "greasyfork",
    minify: false,
    lib: {
      entry: resolve(__dirname, "src/main.tsx"),
      name: "Idle Pixel Fixed",
      formats: ["umd"],
      fileName: (format) => `ipFixed.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "@reduxjs/toolkit", "react-redux"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react-redux": "ReactRedux",
          "@reduxjs/toolkit": "RTK",
        },
      },
    },
  },
});
