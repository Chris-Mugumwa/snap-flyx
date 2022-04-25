import { useEffect } from 'react'
import { useSearch } from '../../hooks/useSearch'
import { useTopic } from '../../hooks/useTopic'
import { useQueryContext } from '../../hooks/useQueryContext'
export {}

type TopicProps = {
	id: string
	slug: string
	title: string
}

const BrowseTopics = () => {
	const { context } = useQueryContext()
	const { topics } = useTopic()
	const { error } = useSearch(context.query)

	useEffect(() => {
		getQuery(context.query)
	}, [context.query, context.setQuery])

	const getQuery = (value: string) => {
		context.setQuery(value)
	}

	if (error) console.log('An error has occurred')

	return (
		<div className='flex justify-center w-full px-4 py-8'>
			<div className='flex justify-center w-[95%] flex-wrap gap-2 '>
				{topics?.map((topic: TopicProps) => (
					<div
						key={topic?.id}
						className='cursor-pointer browse-link hover:ring-2 hover:ring-yellow-dark'
						onClick={() => getQuery(topic?.slug)}>
						<h2 className='text-center w-fit max-w-48'>{topic?.title}</h2>
					</div>
				))}
			</div>
		</div>
	)
}

export default BrowseTopics
