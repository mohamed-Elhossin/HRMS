/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./src/**/*.ts"],
  safelist: [
    { pattern: /^bg-\[\#([0-9a-fA-F]{3,6})\]$/, variants: ['hover', 'focus'] },
    { pattern: /^border-\[\#([0-9a-fA-F]{3,6})\]$/, variants: ['hover', 'focus'] },
    { pattern: /^text-\[\#([0-9a-fA-F]{3,6})\]$/, variants: ['hover', 'focus'] },
    { pattern: /^p[trblxy]?-?[0-9]+$/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^m[trblxy]?-?[0-9]+$/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^text-(xs|sm|base|lg|xl|2xl|3xl|[0-9]+xl)$/, variants: ['hover'] },
    { pattern: /^text-\[\d+px\]$/, variants: ['hover'] },
    { pattern: /^font-(thin|light|normal|medium|semibold|bold|extrabold|black)$/, variants: ['hover'] },
    { pattern: /^font-\[\d+\]$/ },
    { pattern: /^rounded(-[a-z0-9]+)?$/ },
    { pattern: /^shadow(-[a-z]+)?$/ },
    { pattern: /^(w|h)-((\d+)|(1\/2|1\/3|2\/3|1\/4|3\/4))$/ },

    'border',
  ],

  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lightTheme: {
          background: "#f9fafb",
          text: "#1f2937",
          primary: "#3b82f6",
          secondary: "#10b981",
        },
        darkTheme: {
          background: "#000",
          text: "#f9fafb",
          primary: "#60a5fa",
          secondary: "#34d399",
        },
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      animation: {
        'slide-down': 'slideDown 0.8s ease-out'
      }

    },
    container: {
      center: true,
      padding: "2rem",
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      textColor: ["focus-visible"],
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-rtl")],
};
