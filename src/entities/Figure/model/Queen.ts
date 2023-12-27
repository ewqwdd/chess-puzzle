import { Figure, FigureTypes } from './Figure'

export class Queen extends Figure {
	constructor(isAlly: boolean) {
		super(isAlly)
		this.type = FigureTypes.QUEEN
	}
}
