export type Mode = 'development' | 'production'

export interface BuildParams {
    isDev: boolean
    mode: Mode
    port: number
    api: string,
    paths: {
        output: string
        entry: string
        html: string
        src: string
    }
}
