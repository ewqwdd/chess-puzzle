import webpack from 'webpack'
import { BuildParams } from './types'
import { buildLoaders } from './buildLoaders/buildLoaders'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import webpackDevServer from 'webpack-dev-server'
import { buildPlugins } from './buildPlugins/buildPlugins'
import { buildDeServer } from './buildDevServer/buildDevServer'

export const buildWebpackConfig = (params: BuildParams): webpack.Configuration => {

	const {isDev, paths, mode, port, api} = params

	return {
		// mode
		entry: paths.entry,
		output: {
			filename: 'main.[contenthash].js',
			path: paths.output,
			clean: true,
			publicPath: '/'
		},
		mode,
		module: {
			rules: buildLoaders(params)
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
			modules: [paths.src, 'node_modules']
		},
		plugins: buildPlugins(paths, isDev, api),
		optimization: {
			runtimeChunk: 'single'
		},
		devtool: isDev ? 'inline-source-map' : undefined,
		devServer: isDev?  buildDeServer(port) : undefined
	}
}