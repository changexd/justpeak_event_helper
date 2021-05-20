/* eslint-disable quote-props */
const colors = require('tailwindcss/colors');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    dropShadow: {
      'login': '0 4px 4px rgba(0, 0, 0, 0.25)'
    },
    colors: {
      black: colors.black,
      blue: colors.blue,
      white: colors.white,
      yellow: '#FFF5BF',
      grey: '#AAAAAA',
      darkgrey: '#767676',
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
};
