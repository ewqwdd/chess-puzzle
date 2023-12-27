import { Figure, FigureTypes } from './Figure'

export class Rook extends Figure {
	constructor(isAlly: boolean) {
		super(isAlly)
		this.type = FigureTypes.ROOK
	}
}


