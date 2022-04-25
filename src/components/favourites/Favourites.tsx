import { useState, useEffect } from 'react'
import { useUser } from '../../hooks/useUser'
import { useModal } from '../../hooks/useModal'
import { breakpointObj } from '../browse/BrowseImages'
import { db } from '../../firebase'
import { onSnapshot, collection } from 'firebase/firestore'
import Masonry from 'react-masonry-css'
import { FavouriteDetails } from './FavouriteDetails'
export {}

export type FavouriteProps = {
	id: string
	photoURL: string
	username: string
	link: string
	profileURL: string
	active: boolean
}

const Favourites = () => {
	const [item, setItem] = useState<any>({})
	const [favourites, setFavourites] = useState<any>(null)
	const { currUser, logged } = useUser()
	const { open, toggleModal } = useModal()

	const favRef = collection(db, 'users', `${currUser?.uid}`, 'favourites')

	useEffect(() => {
		onSnapshot(favRef, snapshot => {
			setFavourites(snapshot.docs.map(doc => doc.data()))
		})
	}, [setFavourites, favRef])

	const toggle = (item: FavouriteProps) => {
		setItem(item)
		toggleModal()
	}

	return (
		<div className='relative'>
			{!logged && (
				<div className='fixed top-0 left-0 right-0 flex items-center justify-center w-screen h-screen bg-gray-light'>
					<h1 className='text-xl text-blue-dark'>
						Oops, you need to be logged in to use this feature
					</h1>
				</div>
			)}
			<Masonry breakpointCols={breakpointObj} className='flex w-auto gap-2'>
				{favourites?.map((image: FavouriteProps) => (
					<div className='mb-2 overflow-hidden' key={image?.id}>
						<img
							src={`${image?.photoURL}`}
							alt='favourite'
							loading='lazy'
							onClick={() => toggle(image)}
							className='browse-image'
						/>
					</div>
				))}
			</Masonry>
			{open && <FavouriteDetails item={item} toggleModal={toggleModal} />}
		</div>
	)
}

export default Favourites
