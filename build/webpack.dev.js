const config = require('./webpack.base')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const webpackServerConf = require('./webpack.server.js')
const webpackServer = require('webpack-dev-server')
const appConf = require('./app.conf')

config.mode = 'development'

// Enable sourcemaps for debugging webpack's output.
config.devtool = 'eval-source-map'

Object.assign(config.output, {
	filename: '[name].js',
	chunkFilename: '[id].js',
	publicPath: '/'
})

config.entry.app.unshift('webpack-dev-server/client?http://' + appConf.serverName + ':' + appConf.port + '/', 'webpack/hot/dev-server')

config.module.rules = config.module.rules.concat([
	{
		test: /\.(less|css)$/,
		use: [
			'style-loader',
			'css-loader',
			'postcss-loader',
			{
				loader: 'less-loader',
				options: {
					javascriptEnabled: true
				}
			}]
	},
	{
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		loader: require.resolve('babel-loader'),
		options: {
			// This is a feature of `babel-loader` for webpack (not Babel itself).
			// It enables caching results in ./node_modules/.cache/babel-loader/
			// directory for faster rebuilds.
			cacheDirectory: true,
			plugins: ['react-hot-loader/babel']
		}
	}
])

const appWebPath = 'http://' + appConf.serverName + ':' + appConf.port

config.plugins = (config.plugins || []).concat([
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
	new ExtractTextPlugin({
		fallback: 'style-loader',
		filename: '[name].css'
	}),
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: 'src/index.html'
	}),
	
	new webpack.DefinePlugin({
		DEBUG: true
	}),
	new OpenBrowserPlugin({ url: appWebPath })
])

const compiler = webpack(config)
const webServer = new webpackServer(compiler, webpackServerConf)
webServer.listen(appConf.port, appConf.serverName)
