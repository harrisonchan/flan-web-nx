module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': '../sever',
        },
      },
    ],
  ],
}
