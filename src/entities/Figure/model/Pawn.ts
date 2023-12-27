import { Figure, FigureTypes } from './Figure'

export class Pawn extends Figure {
	constructor(isAlly: boolean) {
		super(isAlly)
		this.type = FigureTypes.PAWN
	}
}