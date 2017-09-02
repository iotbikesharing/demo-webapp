const webpack = require("webpack")
const path = require('path')

const config = {
    entry: './src/index.jsx',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ],

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}

module.exports = config