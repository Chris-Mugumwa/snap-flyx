import React, { Suspense } from 'react'
import { useUser } from '../../hooks/useUser'
import { Loading } from '../../components/loading/Loading'
import { MenuAvatar } from '../../containers/navigation/MenuAvatar'
export {}

const Favourites = React.lazy(
	() => import('../../components/favourites/Favourites'),
)

export const FavouritesContainer = () => {
	const { currUser } = useUser()

	return (
		<Suspense fallback={<Loading />}>
			<div className='flex flex-col items-center gap-4'>
				<div className='flex flex-col items-center gap-2 py-10'>
					<MenuAvatar />
					<h2 className='text-2xl font-semibold lg:text-5xl font-poppins'>
						{currUser?.displayName}'s Favourites
					</h2>
				</div>
				<Favourites />
			</div>
		</Suspense>
	)
}
