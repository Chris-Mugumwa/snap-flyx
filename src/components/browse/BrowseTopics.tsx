import { useState, useRef, useEffect } from 'react'
import { useSearch } from '../../hooks/useSearch'
import { NavLink } from 'react-router-dom'
import { useTopic } from '../../hooks/useTopic'
import { motion } from 'framer-motion'
import { useQueryContext } from '../../hooks/useQueryContext'
export {}

type TopicProps = {
	id: string
	slug: string
	title: string
}

const BrowseTopics = () => {
	const [width, setWidth] = useState(0)
	const { context } = useQueryContext()
	const carousel = useRef<HTMLDivElement | null>(null)
	const { topics } = useTopic()
	const { error } = useSearch(context.query)

	useEffect(() => {
		getQuery(context.query)
	}, [context.query, context.setQuery])

	const getQuery = (value: string) => {
		context.setQuery(value)
	}

	useEffect(() => {
		if (carousel?.current !== null) {
			setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
		}
	}, [setWidth, carousel])

	return (
		<motion.div className='w-full px-4 py-8 overflow-x-scroll' ref={carousel}>
			<motion.div
				drag='x'
				dragConstraints={{ right: 0, left: -width }}
				className='flex justify-center w-full gap-2 '>
				{topics?.map((topic: TopicProps) => (
					<NavLink
						to={`/browse/q=${topic?.slug}`}
						key={topic?.id}
						className={({ isActive }) =>
							!isActive
								? 'px-4 py-2 rounded-md bg-blue-dark text-gray-light font-libre-franklin w-fit hover:ring-2 hover:ring-yellow-dark transition-all duration-500 first:ml-8'
								: 'px-4 py-2 rounded-md bg-blue-dark text-gray-light font-libre-franklin w-fit ring-2 ring-yellow-dark first:ml-8'
						}
						onClick={() => getQuery(topic?.slug)}>
						<h2 className='w-48 text-center'>{topic?.title}</h2>
					</NavLink>
				))}
			</motion.div>
		</motion.div>
	)
}

export default BrowseTopics
