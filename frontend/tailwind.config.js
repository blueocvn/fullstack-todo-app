/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite-react/tailwind';
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', flowbite.content()],
  theme: {
    extend: {
      border: '#ccc'
    },
  },
  plugins: [flowbite.plugin()],
};