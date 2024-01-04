export type Color = 
'primary' | 
'secondary' | 
'item' | 
'bg-primary' | 
'bg-secondary' | 
'item-dark' | 
'dark' | 
'item-medium' |
'warning' |
'error'
type target = 'bg' | 'text'

export const ColorMapper = (color: Color = 'primary', target: target = 'text', inverted?: boolean) => {
	const result: string[] = [color + 'text']
	if (target) {
		if (target === 'bg') {
			result[0] = color + 'bg'
		}
	}
	if (inverted) {
		result.push('inverted')
	}

	return result.join(' ')
}