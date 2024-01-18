import { Board } from 'entities/Board'
import styles from './AutoPlayBoard.module.less'
import { boardCells as initBoardCells } from '../config/boardCells'
import { useCallback, useEffect, useRef, useState } from 'react'
import { puzzle } from '../config/puzzle'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'

export default function AutoPlayBoard() {

	const [boardCells, setBoardCells] = useState(initBoardCells)
	const [isAnimating, setIsAnimating] = useState<boolean>(false)
	const index = useRef<number>(0)

	const nextMove = useCallback(() => {
		if (isAnimating) return

		if (index.current === puzzle.length) {
			setIsAnimating(true)
			setTimeout(() => {
				setIsAnimating(false)
				setBoardCells(boardCells)
				index.current = 0
			}, 1100)
			return
		}

		const [[prevY, prevX], [nextY, nextX]] = puzzle[index.current].move
		setBoardCells(value => {
			const newValue = JSON.parse(JSON.stringify(value))
			newValue[nextY][nextX].figure = newValue[prevY][prevX].figure
			newValue[prevY][prevX].figure = undefined
			return newValue
		})
		index.current += 1

	}, [isAnimating])

	useEffect(() => {
		const interval = setInterval(async() => {
			nextMove()
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [nextMove])

	return (
		<div className={ClassNames(styles.board, {[styles.animating]: isAnimating}, [])}>
			<Board boardCells={boardCells} isBlocked/>
		</div>
	)
}
