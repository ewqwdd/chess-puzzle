import { timerActions } from 'entities/Timer/model/slice/timerSlice'
import { MutableRefObject, useCallback, useMemo, useRef } from 'react'
import { useAppDispatch } from './useAppDispatch'

export const useStopWatch = () => {
	const dispatch = useAppDispatch()

	const setTimer = useCallback((sec?: number) => {
		dispatch(timerActions.setTimer(sec))
	}, [])

	const interval = useRef() as MutableRefObject<ReturnType<typeof setInterval>>

	const reset = useCallback(() => {
		setTimer(0)
	}, [])
	const stop = useCallback(() => {
		clearInterval(interval.current)
        
	}, [])
	const start = useCallback(() => {
		if (interval.current) clearInterval(interval.current)
		interval.current = setInterval(() => {
			setTimer()
		}, 1000)
	}, [])

	const returnMemo = useMemo(() => ({ start, reset, stop }), [])

	return returnMemo
}