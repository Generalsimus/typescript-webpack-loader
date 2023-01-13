# [Webpack Typescript Loader](https://www.npmjs.com/package/webpack-ts-load)

[![npm version][npm-version-src]][npm-version-href]
[![npm href][standard-js-src]][standard-js-href]

### webpack.config
```js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.(((t|j)sx?)|json)$/i,
        exclude: path.resolve(__dirname, "node_modules"),
        use: [
          {
            loader: "webpack-ts-load",
            options: {
              name,          // plugin name 
              options,       // ts.CompilerOptions 
              tsConfigPath   // tsConfig file name
              test,          // file test regexp 
              transforms,    // ts.CustomTransformers
            },
          },
        ],
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```



## License

MIT

<!-- Refs -->
[standard-js-src]: https://img.shields.io/badge/license-MIT-brightgreen?&style=flat-square
[standard-js-href]: https://github.com/Generalsimus/KIX/blob/master/LICENSE

[npm-version-src]: https://img.shields.io/npm/v/webpack-ts-load?&style=flat-square
[npm-version-href]: https://www.npmjs.com/package/webpack-ts-load



 
