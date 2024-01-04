import { memo, useCallback, useEffect } from 'react'
import { Board, CellCords, boardReducer, getPuzzle } from 'entities/Board'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { fetchPuzzle } from 'entities/Board/model/services/fetchPuzzle'
import { useStopWatch } from 'shared/hooks/useStopwatch'
import DynamicModuleLoader from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { useSelector } from 'react-redux'
import { boardActions } from 'entities/Board/model/slice/boardSlice'
import { savePuzzle } from 'entities/Board/model/services/savePuzzle'
import { getBoard, getEnabled, getError, getIsBlocked, getIsCompleted, getIsFailed, getIsLoading, getSavedError, getSavedIsLoading, getSavedIsSuccess } from 'entities/Board/model/selectors/selectors'
import { timerActions } from 'entities/Timer/model/slice/timerSlice'


export default memo(function PlayPage() {
	
	const dispatch = useAppDispatch()
	const {start} = useStopWatch()
	const puzzle = useSelector(getPuzzle)
	const savedSuccess = useSelector(getSavedIsSuccess)
	
	const boardCells = useSelector(getBoard)
	const isLoading = useSelector(getIsLoading)
	const enabled = useSelector(getEnabled)
	const isFailed = useSelector(getIsFailed)
	const isCompleted = useSelector(getIsCompleted)
	const isBlocked = useSelector(getIsBlocked)
	const error = useSelector(getError)
	const savedIsLoading = useSelector(getSavedIsLoading)
	const savedError = useSelector(getSavedError)
	
	useEffect(() => {
		if (puzzle) return
		dispatch(fetchPuzzle())
	}, [])

	useEffect(() => {
		setInterval(() => {
			dispatch(timerActions.setTimer())
		}, 1000)
	}, [])

	useEffect(() => {
		return () => {
			if (savedSuccess) {
				dispatch(boardActions.clear())
			}
		}
	}, [savedSuccess])

	const clear = useCallback(() => {
		dispatch(boardActions.clearCurrent())
	}, [dispatch])

	const retry = useCallback(() => {
		dispatch(boardActions.reverseLast())
	}, [])

	const retryFetch = useCallback(() => {
		dispatch(fetchPuzzle())
	}, [])

	const saveResult = useCallback(() => {
		dispatch(savePuzzle())
	}, [])

	const figureClick = useCallback((cords: CellCords) => {
		return () => {
			dispatch(boardActions.setCurrent(cords))
		}
	}, [dispatch])

	const enabledClick = useCallback((cords: CellCords) => {
		return () => {
			dispatch(boardActions.move(cords))
			setTimeout(() => {
				dispatch(boardActions.moveNext())
			}, 500)
		}
	}, [dispatch])

	return (
		<DynamicModuleLoader reducers={{
			board: boardReducer
		}}>
			<div id='board'>
				<Board 
					// reset={reset} 
					clear={clear} 
					retry={retry}
					retryFetch={retryFetch}
					saveResult={saveResult}
					figureClick={figureClick}
					enabledClick={enabledClick}
					boardCells={boardCells}
					enabled={enabled}
					error={error}
					isBlocked={isBlocked}
					isCompleted={isCompleted}
					isFailed={isFailed}
					isLoading={isLoading}
					savedError={savedError}
					savedIsLoading={savedIsLoading}/>
			</div>
		</DynamicModuleLoader>
	)
}
)