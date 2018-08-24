const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	watch: true,
	watchOptions: {
		ignored: /node_modules/
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			minify: {
				caseSensitive: true,
				collapseWhitespace: false,
				html5: true,
				removeComments: true,
				removeEmptyAttributes: true,
				removeRedundantAttributes: true
			},
			hash: true,
			title: 'Fast Article Site',
			template: 'index.hbs',
			templateParameters: () => require('./article')
		})
	],
	module: {
		rules: [
			{
				test: /\.hbs$/,
				loader: 'handlebars-loader'
			},
		]
	},
};