const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const config = require('./webpack.base')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const fs = require('fs-extra')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { log, renderAscii } = require('./core/util')
const Spinner = require('./core/spinner')

config.mode = 'production'

Object.assign(config.output, {
	filename: '[name].[chunkhash].js',
	chunkFilename: '[id].[chunkhash].js',
	publicPath: '/',
	path: path.resolve(__dirname, '../assets')
})

config.module.rules = config.module.rules.concat([
	{
		test: /\.less$/,
		use: ExtractTextPlugin.extract({
			use: [
				'css-loader',
				'postcss-loader',
				'less-loader']
		})
	},
	{
		test: /\.(js|jsx)$/,
		use: ['babel-loader'],
		exclude: /node_modules/
	}
])

config.plugins = (config.plugins || []).concat([
	new webpack.DefinePlugin({
		DEBUG: false,
		'process.env': {
			NODE_ENV: '"production"'
		}
	}),
	new UglifyJSPlugin(),
	//想看包文件的情况，可以打开
	//new BundleAnalyzerPlugin(),
	new ExtractTextPlugin('[name].[chunkhash].css'),
	// new CopyWebpackPlugin([{
	// 	from: 'src/static'
	// }, {
	// 	from: 'src/index.html'
	// }]),
	
	new HtmlWebpackPlugin({
		filename: '../assets/index.html',
		template: 'src/index.html'
	})
])

fs.remove(path.resolve(__dirname, '../assets'))
log.info('assets文件夹已被删除')

const spinner = new Spinner('正在打包...')
spinner.start()
webpack(config, (err, stats) => {
	spinner.stop()
	if (err) {
		log.error(err)
		return
	}
	log.info(stats.toString({}))
	renderAscii()
	log.success('打包成功')
})

