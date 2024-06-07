module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.ios.tsx',
          '.android.ts',
          '.android.tsx',
          '.ts',
          '.tsx',
          '.js',
          '.jsx',
          '.json',
        ],
        alias: {
          '@core': './src/core',
          '@assets': './src/assets',
          '@theme': './src/theme',
          '@contacts': './src/contacts',
          '@native-modules': './src/native-modules',
        },
      },
    ],
  ],
};
