var process = require('process');
var path = require('path');
var webpack = require('webpack');
var StringReplacePlugin = require("string-replace-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractSass = new ExtractTextPlugin({
    filename: "css/[name].css"
});
var isProduction = (process.env.TARGET === 'production');
var outDir = path.resolve(__dirname, (isProduction ? 'dist' : 'build'));
var myPlugins = [
    new CleanWebpackPlugin(outDir, {
        verbose: true
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    }),
    extractSass,
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
    }),
    new CopyWebpackPlugin([{
        from: './assets/images',
        to: 'images'
    }, ])
];
if (process.env.TARGET === 'production') {
    myPlugins.push(new webpack.optimize.UglifyJsPlugin());
    myPlugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    );
}

module.exports = {
    entry: {
        app: './src/app',
    },
    output: {
        path: outDir,
        filename: 'js/[name].js'
    },
    module: {
        rules: [{
                enforce: 'pre',
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: "source-map-loader"
            },
            {
                enforce: 'pre',
                test: /MyUtil.ts$/,
                loader: StringReplacePlugin.replace({
                    replacements: [{
                        pattern: /\/\* @replace-begin \*\/([\s\S]*?)\/\* @replace-end \*\//g,
                        replacement: function(match, p1, offset, string) {
                            console.info('matched "' + p1 + '" in "' + match + '" at ' + offset);
                            var targetStrings = {};
                            if (isProduction) {
                                targetStrings["'mode'"] = "'production'";
                                targetStrings["'debug'"] = "false";
                                targetStrings["'api_url'"] = "'https://api.myshop.rocks'";
                            }
                            else {
                                targetStrings["'mode'"] = "'development'";
                                targetStrings["'debug'"] = "true";
                                targetStrings["'api_url'"] = "'https://localhost:8100/myshop'";
                            }

                            var result = (targetStrings[p1] ? targetStrings[p1] : p1);
                            console.info('replaced as "' + result + '"');
                            return result;
                        }
                    }]
                })
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules|vue\/src/,
                use: [{
                    loader: 'ts-loader'
                }]
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader", // translates CSS into CommonJS
                        options: {
                            minimize: isProduction
                        }
                    }, {
                        loader: "sass-loader" // compiles Sass to CSS
                    }],
                    // use style-loader in development
                    fallback: "style-loader" // creates style nodes from JS strings
                })
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]',
            },
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: [
                    './src/index.html'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    plugins: myPlugins,
    devtool: 'source-map',
};
