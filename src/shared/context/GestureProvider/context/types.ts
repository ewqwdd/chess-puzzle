export type Spring = typeof import('@react-spring/web')
export type Gesture = typeof import('@use-gesture/react')

export interface GestureProvider {
    Spring?: Spring
    Gesture?: Gesture
    isImported: boolean
}