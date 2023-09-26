module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@navigation': './src/navigation',
          '@assets': './src/assets',
          '@features': './src/features',
          '@shared': './src/shared',
          '@store': './src/store',
        },
      },
    ],
  ],
};
