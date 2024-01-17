import { HStack } from 'shared/ui/Flex'
import Card from './Card'

interface PaginationProps {
    current: number
    pages: number
    setPage: (num: number) => void
}

export default function Pagination({current, pages, setPage}: PaginationProps) {
    
	return (
		<HStack gap={6} justify='center'>
			{current > 1 && <Card onClick={() => setPage(current - 1)}>{'<'}</Card>}
			{current > 1 && <Card onClick={() => setPage(1)}>1</Card>}
			{current > 3 && <Card disabled>{'...'}</Card>}
			{current > 2 && <Card onClick={() => setPage(current - 1)}>{current - 1}</Card>}
			<Card disabled>
				{current}
			</Card>
			{current < (pages - 1) && <Card onClick={() => setPage(current + 1)}>{current + 1}</Card>}
			{current < (pages - 2) && <Card disabled>{'...'}</Card>}
			{current < pages && <Card onClick={() => setPage(pages)}>{pages}</Card>}
			{current < pages && <Card onClick={() => setPage(current + 1)}>{'>'}</Card>}
		</HStack>
	)
}
