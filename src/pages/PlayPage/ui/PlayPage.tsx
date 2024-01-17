import { memo, useCallback, useEffect } from 'react'
import { Board, CellCords, FailedModal, Puzzle, boardReducer, getPuzzle } from 'entities/Board'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { fetchPuzzle } from 'entities/Board/model/services/fetchPuzzle'
import { useStopWatch } from 'shared/hooks/useStopwatch'
import DynamicModuleLoader from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { useSelector } from 'react-redux'
import { boardActions } from 'entities/Board/model/slice/boardSlice'
import { savePuzzle } from 'entities/Board/model/services/savePuzzle'
import { getBoard, getEnabled, getError, getIsBlocked, getIsCompleted, getIsFailed, getIsLoading, getSavedError, getSavedIsLoading, getSavedIsSuccess } from 'entities/Board/model/selectors/selectors'
import SuccessModal from 'entities/Board/ui/SuccessModal/SuccessModal'
import ErrorModal from 'entities/Board/ui/ErrorModal/ErrorModal'
import { MobileView } from 'react-device-detect'
import { Timer } from 'entities/Timer'
import { VStack } from 'shared/ui/Flex'
import styles from './PlayPage.module.less'
import Heading from 'shared/ui/Heading/Heading'
import Cookies from 'js-cookie'
import { timerActions } from 'entities/Timer/model/slice/timerSlice'

export default memo(function PlayPage() {
	
	const dispatch = useAppDispatch()
	const {start, reset, stop} = useStopWatch()
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
		dispatch(fetchPuzzle()).then((data) => {
			const id = (data.payload as Puzzle).id
			const savedTime = Cookies.get(String(id))
			reset()
			start()
			if (savedTime) {
				dispatch(timerActions.setTimer(Number(savedTime || 0)))
				Cookies.remove(String(id))
			}
		})
	}, [])

	useEffect(() => {
		return () => {
			if (savedSuccess) {
				dispatch(boardActions.clear())
			}
		}
	}, [savedSuccess])

	const fetchNext = useCallback(() => {
		dispatch(fetchPuzzle()).then(() => {
			reset()
			start()
		})
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
			<MobileView>
				<Heading align='center' size={3} margin>
					SOLVE THE PUZZLE
				</Heading>
			</MobileView>
			<div id='board'>
				<Board 
					stop={stop}
					reset={reset} 
					clear={clear} 
					saveResult={saveResult}
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
			<ErrorModal
				isVisible={!!savedError}
				text={'Please try again later'}
				title='Failed to save your result'
			/>
			<MobileView>
				<VStack align='align-center' className={styles.mobileBottom}>
					<Timer />
				</VStack>
			</MobileView>
		</DynamicModuleLoader>
	)
}
)