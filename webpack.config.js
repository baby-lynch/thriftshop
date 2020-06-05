var webpack = require('webpack');
module.exports = {
    loader: {
        test: /\.png|jpg$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
        }
    },
}