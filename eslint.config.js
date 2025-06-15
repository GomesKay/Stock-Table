import js from "@eslint/js"
import { defineConfig } from "eslint/config"
import prettier from "eslint-plugin-prettier"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import tseslint from "typescript-eslint"
import globals from "globals"

export default defineConfig([
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        document: true,
        window: true,
      },
    },
    plugins: {
      react,
      prettier,
      "react-hooks": reactHooks,
      "simple-import-sort": simpleImportSort,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "simple-import-sort/imports": "warn",
    },
  },
  {
    files: ["vite.config.ts", "vite.config.js", "*.config.ts", "*.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
])
