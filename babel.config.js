module.exports = {
  presets: [
    ['@babel/preset-env', { 
      targets: 'defaults',
      useBuiltIns: 'usage',
      corejs: 3,
      debug: process.env.NODE_ENV === 'development'
    }], 
    ['@babel/preset-react', {
      runtime: 'automatic',
      development: process.env.NODE_ENV === 'development'
    }],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-transform-class-properties', { loose: true }],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator'
  ],
  env: {
    production: {
      plugins: [
        'babel-plugin-transform-remove-console',
        '@babel/plugin-transform-react-constant-elements',
        '@babel/plugin-transform-react-inline-elements'
      ]
    },
    development: {
      plugins: [
        'react-refresh/babel'
      ]
    }
  }
};