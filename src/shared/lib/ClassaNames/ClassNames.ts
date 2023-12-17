export const ClassNames = (className: string = '', mods: Record<string, boolean> = {}, extra: string[] = []) => {
	return [
		className,
		...Object.entries(mods)
			.filter(([, value]) => value)
			.map(elem => elem[1]),
		...extra
	].join(' ')
}