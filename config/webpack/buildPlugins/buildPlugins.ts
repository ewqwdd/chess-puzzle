import { ModuleOptions } from "webpack"
import { BuildParams } from "../types"
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from "mini-css-extract-plugin"

export const buildPlugins = (paths: BuildParams['paths']) => {
    return [
        new HtmlWebpackPlugin({
            template: paths.html
        }),
        new MiniCssExtractPlugin()
    ]
}