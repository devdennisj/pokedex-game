/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: ["forest"],
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
