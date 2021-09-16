// Start
npm i -D webpack webpack-cli
npm i -D webpack-dev-server
npm i -g cross env

// Assets
npm i -D html-webpack-plugin
npm i -D clean-webpack-plugin
npm i -D copy-webpack-plugin
npm i -D file-loader

// CSS
npm i -D style-loader css-loader
npm i -D mini-css-extract-plugin
npm i -D css-minimizer-webpack-plugin
npm i -D node-sass sass-loader

// Babel
npm i -D babel-loader @babel/core
npm i -D @babel/preset-env
npm i --save @babel/polyfill
npm i -D @babel/plugin-proposal-class-properties

npm i -D @babel/preset-typescript
npm i -D @babel/preset-react // ( npm i react react-dom )
npm i -D eslint-loader // ( npm i -D eslint )

// Optimize app
npm i lodash // ( babel.js )
{
    import('lodash').then(_ => {
    console.log('Lodash', _.random(0, 42, true))
    })
}

// Analyze
npm i -D webpack-bundle-analyzer

"dev": "cross-env NODE_ENV=development webpack --mode development",
"build": "cross-env NODE_ENV=development webpack --mode production",
"start": "cross-env NODE_ENV=development webpack webpack-dev-server --mode development --open"