import { type Config } from "tailwindcss"
import colors from "tailwindcss/colors"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ...other colors you use like input, ring, etc
      },
    },
  },
  plugins: [],
}
export default config
