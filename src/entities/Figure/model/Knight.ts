import { Figure, FigureTypes } from './Figure'

export class Knight extends Figure {
	constructor(isAlly: boolean) {
		super(isAlly)
		this.type = FigureTypes.KNIGHT
	}
}

