import { ModuleOptions } from 'webpack'
import { BuildParams } from '../types'
import { cssLoader } from './loaders/cssLoader'
import { svgLoader } from './loaders/svgLoader'
import { htmlLoader } from './loaders/htmlLoader'
import { tsLoader } from './loaders/tsLoader'
import { fontLoader } from './loaders/fontLoader'
import { fileLoader } from './loaders/fileLoader'

export const buildLoaders = ({isDev}: BuildParams) => {
	return [
		tsLoader,
		htmlLoader,
		cssLoader(isDev),
		svgLoader,
		fontLoader,
		fileLoader,
	]
}