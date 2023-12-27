import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
    children: React.ReactNode
    element?: HTMLElement
}

export default function Portal({ children, element = document.body }: PortalProps) {
	const [domReady, setDomReady] = useState(false)

	useEffect(() => {
		setDomReady(true)
	}, [])
	return domReady ? createPortal(children, element) : null
};
