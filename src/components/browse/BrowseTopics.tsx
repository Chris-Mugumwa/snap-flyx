import { NavLink } from 'react-router-dom'
import { useTopic } from '../../hooks/useTopic'
import { useQueryContext } from '../../hooks/useQueryContext'
import { useTopicsSearch } from '../../hooks/useTopicsSearch'
export {}

type TopicProps = {
	id: string
	slug: string
	title: string
}

const BrowseTopics = () => {
	const { context } = useQueryContext()
	const { topics } = useTopic()
	const { error } = useTopicsSearch(context.topic)

	const getQuery = (value: string) => {
		context.setTopic(value)
	}

	if (error) console.log('An error has occurred')

	return (
		<div className='flex justify-center w-full px-4 py-8'>
			<div className='flex justify-center w-[95%] flex-wrap gap-2 '>
				{topics?.map((topic: TopicProps) => (
					<NavLink
						to={`/topic/${topic?.slug}`}
						key={topic?.id}
						className={({ isActive }) =>
							isActive
								? 'cursor-pointer browse-link ring-2 ring-yellow-dark'
								: 'cursor-pointer browse-link hover:ring-2 hover:ring-yellow-dark'
						}
						onClick={() => getQuery(topic?.slug)}>
						<h2 className='text-center w-fit max-w-48'>{topic?.title}</h2>
					</NavLink>
				))}
			</div>
		</div>
	)
}

export default BrowseTopics
