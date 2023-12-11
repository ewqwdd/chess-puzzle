import webpack from 'webpack'
import { BuildParams } from './types'
import { buildLoaders } from './buildLoaders/buildLoaders'
import webpackDevServer from 'webpack-dev-server'
import { buildPlugins } from './buildPlugins/buildPlugins'
import { buildDeServer } from './buildDevServer/buildDevServer'

export const buildWebpackConfig = (params: BuildParams): webpack.Configuration => {

    const {isDev, paths, mode, port} = params

    return {
        // mode
        entry: paths.entry,
        output: {
            filename: 'main.[contenthash].js',
            path: paths.output,
            clean: true
        },
        mode,
        module: {
            rules: buildLoaders(params)
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
          },
        plugins: buildPlugins(paths),
        optimization: {
            runtimeChunk: 'single'
        },
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: buildDeServer(port)
    }
}