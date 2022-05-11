import { useState, useEffect } from 'react'
import { useUser } from '../../hooks/useUser'
import { useModal } from '../../hooks/useModal'
import { db } from '../../firebase'
import { onSnapshot, collection, DocumentData } from 'firebase/firestore'
import { MasonryGrid } from '../masonry/MasonryGrid'
import { FavouriteDetails } from './FavouriteDetails'
import { NotLogged } from '../error/NotLogged'
import { motion } from 'framer-motion'
export {}

const Favourites = () => {
	const [item, setItem] = useState<DocumentData | any>(null)
	const [favourites, setFavourites] = useState<DocumentData | null>(null)
	const { currUser, logged } = useUser()
	const { open, toggleModal } = useModal()

	useEffect(() => {
		const favRef = collection(db, 'users', `${currUser?.uid}`, 'favourites')
		onSnapshot(favRef, snapshot => {
			setFavourites(snapshot?.docs?.map(doc => doc.data()))
		})
	}, [setFavourites, currUser?.uid])

	const toggle = (item: DocumentData) => {
		setItem(item)
		toggleModal()
	}

	return (
		<div className='relative'>
			{!logged && <NotLogged />}
			<MasonryGrid>
				{favourites?.map((image: any) => (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 1 }}
						className='mb-2 overflow-hidden'
						key={image?.id}>
						<img
							src={`${image?.photoURL}`}
							alt='favourites'
							loading='lazy'
							onClick={() => toggle(image)}
							className='browse-image'
						/>
					</motion.div>
				))}
			</MasonryGrid>
			{open && <FavouriteDetails item={item} toggleModal={toggleModal} />}
		</div>
	)
}

export default Favourites
