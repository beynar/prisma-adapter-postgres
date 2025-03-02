import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["./tests/**/*.{test,spec}.{js,ts,tsx}"],
    testTimeout: 1000
  }
});
