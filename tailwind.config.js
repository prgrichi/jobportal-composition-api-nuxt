export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        neutral: {
          900: "#0F172A",
          700: "#1F2937",
          600: "#4B5563",
          200: "#E5E7EB",
          100: "#F8FAFC",
        },

        primary: {
          500: "#EF4444", // Helles Rot
          600: "#DC2626",
          700: "#B91C1C",
        },
        accent: {
          500: "#FBBF24", // Gold
          600: "#F59E0B",
        },
        surface: "#fff",


      },

      maxWidth: {
        app: "1200px"
      },
    }
  },
  plugins: []
}






// primary: {
//   500: "#2DD4BF",
//   600: "#14B8A6",
//   700: "#0F766E",
// },
// secondary: "#99F6E4",
// surface: "#F0FDFA",

