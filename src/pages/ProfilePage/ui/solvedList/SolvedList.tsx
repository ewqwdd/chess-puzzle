import { Board } from 'entities/Board'
import { useNotify } from 'entities/Notification'
import { getBoards, getErrorPuzzles, getIsLoadingPuzzles } from 'entities/Stats'
import { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Spinner } from 'shared/ui/Spinner'
import styles from './SolvedList.module.less'


export default memo(function SolvedList() {
	const boards = useSelector(getBoards)
	const isLoading = useSelector(getIsLoadingPuzzles)
	const error = useSelector(getErrorPuzzles)
	const { add } = useNotify()

	useEffect(() => {
		if (!error) return
		add(error)
	}, [error])

	return (
		<>
			{' '}
			{isLoading ? (
				<Spinner />
			) : (
				boards?.map((elem) => (
					<Link to={`/puzzles/${elem.id}`} key={elem.id} className={styles.link}>
						<Board boardCells={elem.board} isBlocked />
					</Link>
				))
			)}
		</>
	)
}
)