import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  {
    env: {
      es2020: true, // <- activate “es2020” globals
      browser: true,
      node: true,
      mocha: true,
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
