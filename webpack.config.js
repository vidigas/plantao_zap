const { DefinePlugin, LoaderOptionsPlugin } = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const poststylus = require('poststylus');
const { resolve, join } = require('path');

const plugins = [];
const minimizer = [];

if(process.env.NODE_ENV != 'local') {
	minimizer.push(new UglifyJsPlugin({
		cache: true,
		parallel: true,
		uglifyOptions: {
			compress: true,
			ecma: 6,
			mangle: true
		},
		sourceMap: true
	}));
}

plugins.push(new LoaderOptionsPlugin({
	options: {
		stylus: {
			use: [poststylus(['autoprefixer'])]
		}
	}
}));

module.exports = {
	entry: resolve(__dirname, 'app/index.js'),
	output: join(__dirname, 'public/dist'),
	mode: process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development' ? 'development' : 'production',
	devtool: '#source-map',
	module: {
		rules: [
			{
				test: /.js$/,
				include: [resolve('app')],
				loader: 'babel-loader'
			},
			{
      	test: /\.css$/,
      	use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /.styl$/,
				include: [resolve('app')],
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader',
					options: {
						importLoaders: 1
					}
				}, {
					loader: 'stylus-loader',
					options: {
						'include css': true,
						preferPathResolver: 'webpack',
					}
				}]
			}
		]
	},
	resolve: {
		modules: ['node_modules', resolve('app')]
	},
	plugins,
	optimization: {
		minimizer
	}
};