import React, { Suspense } from 'react'
import { Loading } from '../../components/loading/Loading'

const TopicsSearched = React.lazy(
	() => import('../../components/searched/TopicsSearched'),
)

const BrowseTopics = React.lazy(
	() => import('../../components/browse/BrowseTopics'),
)

const Browse = React.lazy(() => import('../../components/browse/Browse'))

const BrowseImage = React.lazy(
	() => import('../../components/browse/BrowseImage'),
)

export const TopicsSearchedContainer = () => {
	return (
		<Suspense fallback={<Loading />}>
			<BrowseImage>
				<Browse />
			</BrowseImage>
			<BrowseTopics />
			<TopicsSearched />
		</Suspense>
	)
}
