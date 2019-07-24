# react-cdn-webpack
using webpack to create react cdn with apollo method (send request with graphql)

## Step
- npm init: create `package.json`
- create `webpack.config.js` to set config of webpack
- create `app.js` and `index.html`
- insert library with `npm install --save-dev <lib-name>`
- create `.babelrc` file to using babel lib with react
## Build react webapp(CDN)
  `npm run build` to compile all file in react to javascript file. From this project output file have contain `index.html` and `app.js` files.
## Run app command
  `npm start` to run project with node(or reactjs) then project will using command to run app in `webpack.config.js` in `start` scope
## Output
 created by webpack then config in `output` and path folder. So, can using instead current project

## Example Source
- [Example 1](https://thoughtbot.com/blog/setting-up-webpack-for-react-and-hot-module-replacement)
- [Example 2](https://www.valentinog.com/blog/babel/)
