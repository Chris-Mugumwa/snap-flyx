import React, { Suspense } from 'react'
import { Loading } from '../../components/loading/Loading'
import { useRandom } from '../../hooks/useRandom'
export {}

const Browse = React.lazy(() => import('../../components/browse/Browse'))
const BrowseTopics = React.lazy(
	() => import('../../components/browse/BrowseTopics'),
)
const BrowseImages = React.lazy(
	() => import('../../components/browse/BrowseImages'),
)

export const BrowseContainer = () => {
	const { image } = useRandom('1')

	return (
		<>
			<Suspense fallback={<Loading />}>
				<section
					className='relative h-[70vh] object-cover object-center w-[full] no-repeat overflow-y-auto'
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
				<BrowseImages />
			</Suspense>
		</>
	)
}
