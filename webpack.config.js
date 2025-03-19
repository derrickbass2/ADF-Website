const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        publicPath: '/',
        clean: true  // Replaces CleanWebpackPlugin in Webpack 5
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@models': path.resolve(__dirname, 'src/models'),
            '@styles': path.resolve(__dirname, 'src/styles')
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true  // Speeds up compilation
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env', 
                            '@babel/preset-react'
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                auto: true,
                                localIdentName: '[local]--[hash:base64:5]'
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[contenthash][ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[contenthash][ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css'
        }),
        new ForkTsCheckerWebpackPlugin({
            async: true
        }),
        new ESLintPlugin({
            extensions: ['ts', 'tsx'],
            failOnError: true,
            failOnWarning: false
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        compress: true,
        port: 3000,
        hot: true,
        historyApiFallback: true,
        open: true
    },
    devtool: 'source-map',
    performance: {
        hints: 'warning',
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};