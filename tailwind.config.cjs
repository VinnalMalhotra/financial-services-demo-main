/** @type {import('tailwindcss').Config} */
const { ComponentsContentPath } = require("@yext/search-ui-react");
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@yext/search-ui-react/**/*.{html,js,jsx,ts,tsx}",
    ComponentsContentPath,
  ],
  theme: {
    extend: {
      textColor: {
        skin: {
          banner: "var(--color-theme-primary)",
          base: "color-mix(in srgb, var(--color-text-primary) calc(100% * <alpha-value>), transparent)",
          muted: "var(--color-text-muted)",
          inverted: "var(--color-text-primary)",
        },
      },
      outlineColor: {
        skin: {
          banner: "var(--color-theme-primary)",
          base: "color-mix(in srgb, var(--color-text-primary) calc(100% * <alpha-value>), transparent)",
          muted: "var(--color-text-muted)",
          inverted: "var(--color-text-primary)",
        },
      },
      borderColor: {
        skin: {
          base: "color-mix(in srgb, var(--color-text-primary) calc(100% * <alpha-value>), transparent)",
          accent:
            "color-mix(in srgb, var(--color-accent) calc(100% * <alpha-value>), transparent)",
        },
      },
      fill: {
        skin: {
          banner: "var(--color-theme-primary)",
          base: "color-mix(in srgb, var(--color-text-primary) calc(100% * <alpha-value>), transparent)",
          accent:
            "color-mix(in srgb, var(--color-accent) calc(100% * <alpha-value>), transparent)",
        },
      },
      backgroundColor: {
        skin: {
          banner: "var(--color-theme-primary)",
          base: "color-mix(in srgb, var(--color-text-primary) calc(100% * <alpha-value>), transparent)",
          "button-accent": "var(--color-button-accent)",
          "button-accent-hover": "var(--color-button-accent-hover)",
          "button-muted": "var(--color-button-muted)",
          accent: "var(--color-accent)",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("@tailwindcss/typography"),
  ],
};
