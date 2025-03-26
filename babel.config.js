module.exports = {
    presets: [
      ['@babel/preset-env', { targets: 'defaults' }], // Transpile modern JavaScript
      '@babel/preset-react', // Transpile React JSX
      '@babel/preset-typescript' // Transpile TypeScript
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }], // Enable decorators
      ['@babel/plugin-transform-class-properties', { loose: true }], // Enable class properties
      '@babel/plugin-transform-runtime' // Optimize helper code
    ]
  };