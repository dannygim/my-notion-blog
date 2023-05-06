import { defineConfig } from "@twind/core";
import presetTailwind from "@twind/preset-tailwind";

export default {
  ...defineConfig({
    presets: [presetTailwind()],
    theme: {
      extend: {
        height: {
          'screen-3/10': '30vh',
        }
      }
    }
  }),
  selfURL: import.meta.url,
};
