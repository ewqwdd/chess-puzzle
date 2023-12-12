import { buildWebpackConfig } from './config/webpack/buildWebpackConfig'
import path from 'path'
import { BuildParams, Mode } from './config/webpack/types'

interface BuildEnv {
    mode?: Mode
    port?: number
}

export default (env: BuildEnv) => {

	const mode = env.mode || 'development'
	const port = env.port || 8000
	const isDev = mode === 'development'

	const params: BuildParams = {
		port,
		isDev,
		mode,
		paths: {
			entry: path.resolve(__dirname, 'src', 'index.tsx'),
			output: path.resolve(__dirname, 'build'),
			html: path.resolve(__dirname, 'public', 'index.html'),
			src: path.resolve(__dirname, 'src'),
		}
	}
    
	const config = buildWebpackConfig(params)
	return config
}