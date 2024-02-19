/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/**/*.html`],
  theme: {
    extend: {
      screens: {
        'sm' : '375px', // For small phones
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '0rem',
          sm: '0rem',
          lg: '6rem',
          xl: '2rem',
          '2xl': '8rem',
        },
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #7800a1, #7514a6, #7120ab, #6d29b0, #6931b4, #5846c3, #4358cf, #2467d9, #0082e6, #009aec, #00b0ed, #28c4ec)',
        'custom-radial': 'radial-gradient(circle, #290d74, #3a004b, #32002b, #220215, #000000)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), 
    require('daisyui')
  ],
}

