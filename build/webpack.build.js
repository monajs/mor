var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var config = require('./webpack.base')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var fs = require('fs-extra')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

Object.assign(config.output, {
	filename: './[name].[chunkhash].js',
	chunkFilename: './[id].[chunkhash].js',
	publicPath: '',
	path: path.resolve(__dirname, '../assets'),
})

config.module.rules = config.module.rules.concat([
	{
		test: /\.less$/,
		use: ExtractTextPlugin.extract({
			use: [
				'css-loader',
				'postcss-loader',
				'less-loader'],
		}),
	},
	{
		test: /\.(js|jsx)$/,
		use: ['babel-loader'],
		exclude: /node_modules/,
	},
])

config.plugins = (config.plugins || []).concat([
	new webpack.DefinePlugin({
		DEBUG: false,
		'process.env': {
			NODE_ENV: '"production"',
		},
	}),
	new UglifyJSPlugin({
		compress: {
			warnings: false,
		},
	}),
	//想看包文件的情况，可以打开
	//new BundleAnalyzerPlugin(),
	new ExtractTextPlugin('./[name].[chunkhash].css'),
	// new CopyWebpackPlugin([{
	// 	from: 'src/static',
	// }]),
	
	new HtmlWebpackPlugin({
		filename: '../assets/index.html',
		template: 'src/index.html',
	}),
])

fs.remove(path.resolve(__dirname, '../assets'))
console.log('文件夹assets已删除')
fs.remove(path.resolve(__dirname, '../docs'));
console.log('文件夹docs已删除');

console.log('正在打包')
var compiler = webpack(config, (err, stats) => {
	console.log(err)
	console.log('打包成功')
	console.log('[webpack]', stats.toString({}))
	fs.copy(path.resolve(__dirname, '../assets'), path.resolve(__dirname, '../docs'), function () {
		console.log('已复制assets到docs');
	});
})

