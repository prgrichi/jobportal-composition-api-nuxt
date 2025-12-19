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
          500: "#4F46E5",
          600: "#4338CA",
          700: "#3730A3",
        },
        accent: {
          500: "#FB7185",
          600: "#F43F5E",
        },
        surface: "#F6F7FF",



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

