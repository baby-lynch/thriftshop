module.exports = {
    mode:'development',
    module: {
        rules: {
            test: /\.jpg|png|gif|bmp$/,
            use: 'url-loader'
        }
    }
}