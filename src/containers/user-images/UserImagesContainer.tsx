import React, { Suspense } from 'react'
import { useUser } from '../../hooks/useUser'
import { MenuAvatar } from '../../containers/navigation/MenuAvatar'
import { Loading } from '../../components/loading/Loading'
export {}

const UserImages = React.lazy(
	() => import('../../components/user-images/UploadImage'),
)

export const UserImagesContainer = () => {
	const { currUser, logged } = useUser()

	return (
		<Suspense fallback={<Loading />}>
			<div className='relative flex flex-col items-center'>
				{!logged && (
					<div className='fixed top-0 left-0 right-0 flex items-center justify-center w-screen h-screen bg-gray-light'>
						<h1 className='text-xl text-blue-dark'>
							Oops, you need to be logged in to use this feature
						</h1>
					</div>
				)}
				<div className='flex flex-col items-center gap-2 py-10'>
					<MenuAvatar />
					<h2 className='text-2xl font-semibold lg:text-5xl font-poppins'>
						{currUser?.displayName}'s Gallery
					</h2>
				</div>
				<UserImages />
			</div>
		</Suspense>
	)
}
