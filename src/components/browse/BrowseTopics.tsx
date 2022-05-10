import { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useTopic } from '../../hooks/useTopic'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getTopicImages } from '../../features/topicImagesSlice'
export {}

export type TopicProps = {
	id: string
	slug: any
	title: string
	page: number
}

const BrowseTopics = () => {
	const [topic, setTopic] = useState('')
	const { topics } = useTopic()
	const topicImages = useAppSelector(state => state.topic.topicImages)
	const dispatch = useAppDispatch()
	const { slug } = useParams()

	const getQuery = (value: string) => {
		setTopic(value)
	}

	console.log(topicImages)
	return (
		<div className='flex justify-center w-full px-4 py-8'>
			<div className='flex justify-center w-[95%] flex-wrap gap-2 '>
				{topics?.map(({ slug, id, title }: TopicProps) => (
					<NavLink
						to={`/topic/${slug}`}
						key={id}
						className={({ isActive }) =>
							isActive
								? 'cursor-pointer browse-link ring-2 ring-yellow-dark'
								: 'cursor-pointer browse-link hover:ring-2 hover:ring-yellow-dark'
						}
						onClick={() => dispatch(getTopicImages(slug))}>
						<h2 className='text-center w-fit max-w-48'>{title}</h2>
					</NavLink>
				))}
			</div>
		</div>
	)
}

export default BrowseTopics
