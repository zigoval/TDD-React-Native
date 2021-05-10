module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    '/node_modules/(?!native-base|react-native|@react-native-community|@react-navigation)/',
  ],
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
