import { memo, useEffect } from 'react'
import styles from './PlayPage.module.less'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { Board, getBoard, getCurrent, getEnabled, getIsLoading  } from 'entities/Board'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { fetchPuzzle } from 'entities/Board/model/services/fetchPuzzle'
import { Spinner } from 'shared/ui/Spinner'

export default memo(function PlayPage() {
	const dispatch = useAppDispatch()
	const boardCells = useSelector(getBoard)
	const isLoading = useSelector(getIsLoading)
	const enabled = useSelector(getEnabled)
	const current = useSelector(getCurrent)
	
	useEffect(() => {
		dispatch(fetchPuzzle())
	}, [])

	return (
		<div className={ClassNames(styles.layout)}>
			{isLoading ? <Spinner /> : null}
			<Board enabled={enabled} boardCells={boardCells} current={current} />
		</div>
	)
}
)