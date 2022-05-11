import React, { Suspense } from 'react'
import { Loading } from '../../components/loading/Loading'

const Searched = React.lazy(() => import('../../components/searched/Searched'))

const BrowseTopics = React.lazy(
	() => import('../../components/browse/BrowseTopics'),
)

const Browse = React.lazy(() => import('../../components/browse/Browse'))

const BrowseImage = React.lazy(
	() => import('../../components/browse/BrowseImage'),
)

export const SearchedContainer = () => {
	return (
		<Suspense fallback={<Loading />}>
			<BrowseImage>
				<Browse />
			</BrowseImage>
			<BrowseTopics />
			<Searched />
		</Suspense>
	)
}
