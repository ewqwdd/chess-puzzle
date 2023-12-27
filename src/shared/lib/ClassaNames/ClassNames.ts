export const ClassNames = (className: string = '', mods: Record<string, boolean> = {}, extra: string[] = []) => {
	return [
		className,
		...Object.entries(mods)
			.filter(([, value]) => value)
			.map(elem => elem[0]),
		...extra
	].join(' ')
}