module.exports = {
    entry: `${__dirname}/index.js`,
    module: {
        rules: [
            {
                test: /\.(js)?$/,
                include: `${__dirname}/src`,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    output: {
        path: `${__dirname}/dist`,
        filename: "redux-loading-reducer.js"
    }
};
