/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'xs':'320px',
        'xxl':'1440px'
      },
      colors: {
        C1:'#FC4F00',
        C2:'#FF8247',
        C3:'#F48503',
        C4:'#545454',
        C5:'#8B8BA5',
        C6:'#FDFAE5',
        C7:'#A2A2A2',
        C8:'#E7ECFF',
        C9:'#FFE5E5',
        C10:'#EDFFE2',
      }
    },
  },
  plugins: [],
}
