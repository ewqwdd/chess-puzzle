export type Mode = 'development' | 'production'

export interface BuildParams {
    isDev: boolean
    mode: Mode
    port: number
    paths: {
        output: string
        entry: string
        html: string
    }
}
