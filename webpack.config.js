const path = require('path');
var webpack = require('webpack');
// const ManifestPlugin = require('webpack-manifest-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        'app': './app.js',
        
    },

    output: {
        path: path.resolve(__dirname, './build'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options:{
                        presets:['@babel/preset-env'],
                        // babelrc:config('babel'),
                        // babelrc: path.resolve(__dirname, '.babelrc'),
                    }
                }
            },{
                test:/\.html$/,
                use:[
                    {
                        loader:"html-loader"
                    }
                ]
            }

        ]
    },
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
    plugins: [
        // new ManifestPlugin({
        //     fileName: 'manifest.json'
        // }),
        new webpack.ProvidePlugin({
            "React": "react",
            // "ReactDOM":'react-dom',
            // 'PropTypes':'prop-types',
            // 'ApolloClient':'apollo-boost',
            // 'gql':'graphql-tag'
        }),
        new HtmlWebPackPlugin({
            template:"./index.html",
            filename:"./index.html"
        }),
        new DynamicCdnWebpackPlugin()
    ]
}