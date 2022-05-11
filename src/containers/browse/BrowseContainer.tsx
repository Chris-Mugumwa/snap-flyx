import React, { Suspense } from 'react'
import { Loading } from '../../components/loading/Loading'
export {}

const Browse = React.lazy(() => import('../../components/browse/Browse'))
const BrowseTopics = React.lazy(
	() => import('../../components/browse/BrowseTopics'),
)
const BrowseImages = React.lazy(
	() => import('../../components/browse/BrowseImages'),
)
const BrowseImage = React.lazy(
	() => import('../../components/browse/BrowseImage'),
)

export const BrowseContainer = () => {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<BrowseImage>
					<Browse />
				</BrowseImage>

				<BrowseTopics />
				<BrowseImages />
			</Suspense>
		</>
	)
}
