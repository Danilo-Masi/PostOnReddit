/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
		colors: {
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))",
		  },
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))",
		  },
		  primary: {
			DEFAULT: "hsl(var(--primary))",
			foreground: "hsl(var(--primary-foreground))",
		  },
		  secondary: {
			DEFAULT: "hsl(var(--secondary))",
			foreground: "hsl(var(--secondary-foreground))",
		  },
		  muted: {
			DEFAULT: "hsl(var(--muted))",
			foreground: "hsl(var(--muted-foreground))",
		  },
		  accent: {
			DEFAULT: "hsl(var(--accent))",
			foreground: "hsl(var(--accent-foreground))",
		  },
		  destructive: {
			DEFAULT: "hsl(var(--destructive))",
			foreground: "hsl(var(--destructive-foreground))",
		  },
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  textColor: "hsl(var(--text-color))",
		  textPrimary: "hsl(var(--text-primary))",
		  textSecondary: "hsl(var(--text-secondary))",
		  textForeground: "hsl(var(--text-foreground))",
		  buttonColor: "hsl(var(--button-color))",
		  buttonHoverColor: "hsl(var(--button-hover-color))",
		  buttonDisabled: "hsl(var(--button-disabled))",
		  buttonHoverDisabled: "hsl(var(--button-hover-disabled))",
		  buttonError: "hsl(var(--button-error))",
		  buttonHoverError: "hsl(var(--button-hover-error))",
		  buttonSuccess: "hsl(var(--button-success))",
		  buttonHoverSuccess: "hsl(var(--button-hover-success))",
		  buttonHoverEmpty: "hsl(var(--button-hover-empty))",
		  elevation: "hsl(var(--elevation))",
		  elevation2: "hsl(var(--elevation2))",
		  elevation3: "hsl(var(--elevation3))",
		  sidebar: {
			background: "hsl(var(--sidebar-background))",
			border: "hsl(var(--sidebar-border))",
		  },
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  };