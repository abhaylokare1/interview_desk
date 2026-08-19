import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const baseDirectory = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory });

export default [
  { ignores: [".next/**", "node_modules/**"] },
  ...compat.extends("next/core-web-vitals"),
];
