import styles from './Container.module.less'

export const createContainer = () => {
	const portalId = 'notificationsContainer'
	let element = document.getElementById(portalId)

	if (element) return element

	element = document.createElement('div')
	element.setAttribute('id', portalId)
	element.className = styles.container
	document.body.appendChild(element)
	return element
}