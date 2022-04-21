import React, { Suspense } from 'react'
import { useRandom } from '../../hooks/useRandom'
import { Loading } from '../../components/loading/Loading'
import { useQueryContext } from '../../hooks/useQueryContext'
export {}

const Browse = React.lazy(() => import('../../components/browse/Browse'))
const BrowseTopics = React.lazy(
	() => import('../../components/browse/BrowseTopics'),
)
const Searched = React.lazy(() => import('../../components/searched/Searched'))

export const SearchedContainer = () => {
	const { image } = useRandom('1')
	const { context } = useQueryContext()

	return (
		<>
			{context.loading && <Loading />}
			<Suspense fallback={<Loading />}>
				<section
					className='relative h-[70vh] object-cover object-center w-[full] no-repeat'
					style={{
						backgroundImage: `url(${image})`,
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
						backgroundSize: 'cover',
					}}>
					<div className='absolute top-0 left-0 right-0 z-40 h-full bg-black-fade'></div>
					<div className='relative z-40 flex items-center w-full h-full p-3'>
						<Browse />
					</div>
				</section>
				<BrowseTopics />
				<Searched />
			</Suspense>
		</>
	)
}
