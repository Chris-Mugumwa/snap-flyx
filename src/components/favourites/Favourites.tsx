import { useState, useEffect } from 'react'
import { useUser } from '../../hooks/useUser'
import { useModal } from '../../hooks/useModal'
import { breakpointObj } from '../browse/BrowseImages'
import { db } from '../../firebase'
import { onSnapshot, collection, DocumentData } from 'firebase/firestore'
import Masonry from 'react-masonry-css'
import { FavouriteDetails } from './FavouriteDetails'
import { NotLogged } from '../error/NotLogged'
export {}

const Favourites = () => {
	const [item, setItem] = useState<DocumentData | any>(null)
	const [favourites, setFavourites] = useState<DocumentData[] | null>(null)
	const { currUser, logged } = useUser()
	const { open, toggleModal } = useModal()

	const favRef = collection(db, 'users', `${currUser?.uid}`, 'favourites')

	useEffect(() => {
		onSnapshot(favRef, snapshot => {
			setFavourites(snapshot?.docs?.map(doc => doc.data()))
		})
	}, [setFavourites, favRef])

	const toggle = (item: DocumentData) => {
		setItem(item)
		toggleModal()
	}

	// if (favourites === null || item === null) throw new Error()

	return (
		<div className='relative'>
			{!logged && <NotLogged />}
			<Masonry breakpointCols={breakpointObj} className='flex w-auto gap-2'>
				{favourites?.map((image: DocumentData) => (
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
