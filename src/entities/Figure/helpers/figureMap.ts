import { FigureTypes } from '../model/Figure'
import { Bishop } from '../model/Bishop'
import { King } from '../model/King'
import { Knight } from '../model/Knight'
import { Pawn } from '../model/Pawn'
import { Queen } from '../model/Queen'
import { Rook } from '../model/Rook'

export const figureMap = (type: FigureTypes, isAlly: boolean) => {
	switch (type) {
	case FigureTypes.BISHOP: 
		return new Bishop(isAlly)
	
	case FigureTypes.KING: 
		return new King(isAlly)
	
	case FigureTypes.KNIGHT: 
		return new Knight(isAlly)

	case FigureTypes.PAWN: 
		return new Pawn(isAlly)

	case FigureTypes.QUEEN: 
		return new Queen(isAlly)

	case FigureTypes.ROOK: 
		return new Rook(isAlly)
	}
}