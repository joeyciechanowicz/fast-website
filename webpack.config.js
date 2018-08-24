const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;


const article = require('./article');

module.exports = {
	mode: 'production',
	entry: {
		app: './src/index.js',
		lazy_styles: './styles/js-required.css'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new BrotliPlugin({
			asset: '[path].br[query]',
			test: /\.js$|\.css$|\.html$/,
			threshold: 1024,
			minRatio: 0.8
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		new HtmlWebpackPlugin({
			minify: {
				caseSensitive: true,
				collapseWhitespace: false,
				html5: true,
				removeComments: true,
				removeEmptyAttributes: true,
				removeRedundantAttributes: true
			},
			inlineSource: '.(js|css)$',
			hash: false,
			title: 'Fast Article Site',
			template: 'index.hbs',
			templateParameters: article
		}),
		new HTMLInlineCSSWebpackPlugin(),
		new WebpackShellPlugin({
			onBuildEnd: [
				'./node_modules/.bin/html-minifier --case-sensitive --collapse-whitespace --remove-comments --remove-empty-attributes --remove-redundant-attributes --output dist/index.html dist/index.html',
				'brotli -q 10 dist/index.html'
			]
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /critical/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { minimize: true }
					}
				]
			},
			{
				test: /\.css$/,
				exclude: /js-required/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { minimize: true }
					}
				]
			},
			{
				test: /\.hbs$/,
				use: [
					{
						loader: 'handlebars-loader'
					}
				]
			},
		]
	},
};