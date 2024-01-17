import { Board, CellCords, FailedModal } from 'entities/Board'
import { getBoard, getEnabled, getError, getIsBlocked, getIsCompleted, getIsFailed, getIsLoading, getSavedIsLoading } from 'entities/Board/model/selectors/selectors'
import { fetchPuzzle } from 'entities/Board/model/services/fetchPuzzle'
import { boardActions, boardReducer } from 'entities/Board/model/slice/boardSlice'
import ErrorModal from 'entities/Board/ui/ErrorModal/ErrorModal'
import SuccessModal from 'entities/Board/ui/SuccessModal/SuccessModal'
import { memo, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import DynamicModuleLoader from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'


export default memo(function PlayPageId() {
	
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const {id} = useParams()
	const boardCells = useSelector(getBoard)
	const isLoading = useSelector(getIsLoading)
	const enabled = useSelector(getEnabled)
	const isFailed = useSelector(getIsFailed)
	const isCompleted = useSelector(getIsCompleted)
	const isBlocked = useSelector(getIsBlocked)
	const error = useSelector(getError)
	const savedIsLoading = useSelector(getSavedIsLoading)
	
	useEffect(() => {
		dispatch(fetchPuzzle(id))
	}, [])

	useEffect(() => {
		return () => {
			dispatch(boardActions.clear())
		}
	}, [])

	const fetchNext = useCallback(() => {
		dispatch(boardActions.clear())
		navigate('/play')
	}, [])

	const clear = useCallback(() => {
		dispatch(boardActions.clearCurrent())
	}, [dispatch])

	const retry = useCallback(() => {
		dispatch(boardActions.reverseLast())
	}, [])

	const retryFetch = useCallback(() => {
		dispatch(fetchPuzzle())
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
					stop={stop}
					clear={clear} 
					figureClick={figureClick}
					enabledClick={enabledClick}
					boardCells={boardCells}
					enabled={enabled}
					isBlocked={isBlocked}
					isCompleted={isCompleted}
					isLoading={isLoading}
					savedIsLoading={savedIsLoading}/>
			</div>
			<FailedModal isVisible={isFailed} retry={retry} />
			<SuccessModal isVisible={isCompleted} next={fetchNext} />
			<ErrorModal
				isVisible={!!error}
				text={error}
				title='Failed to load Puzzle'
				retry={retryFetch}
			/>
		</DynamicModuleLoader>
	)
}
)