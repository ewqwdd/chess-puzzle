import React from 'react'

interface TimerToStringProps {
    timer: number
}

export default function TimerToString({timer}: TimerToStringProps) {
	return (
		<>
			{Math.round(timer / 60).toString().padStart(2, '0')}
            :
			{(timer % 60).toString().padStart(2, '0').slice(0, 2)}
		</>
	)
}
