declare module '*.less' {
    const content: Record<string, string>
    export default content
}

declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
    export default content
}

declare module '*.wav';

type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T

type ValueOf<T> = T[keyof T]

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'

declare const _IS_DEV_: boolean
declare const _API_: string
declare const _PROJECT_: 'frontend' | 'jest'
