module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      screens: {
        'sm': '450px',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}