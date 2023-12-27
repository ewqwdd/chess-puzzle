import { Figure, FigureTypes } from './Figure'

export class Bishop extends Figure {
	constructor(isAlly: boolean) {
		super(isAlly)
		this.type = FigureTypes.BISHOP
	}
}
