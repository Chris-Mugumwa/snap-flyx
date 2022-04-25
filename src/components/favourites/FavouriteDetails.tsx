import { useUser } from '../../hooks/useUser'
import { db } from '../../firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { IoTrashOutline, IoLinkOutline, IoCloseOutline } from 'react-icons/io5'
import { AnimatePresence, motion } from 'framer-motion'
import { FavouriteProps } from './Favourites'
export {}

type ToggleProps = {
	toggleModal: () => void
	item: FavouriteProps
}

export const FavouriteDetails = ({ item, toggleModal }: ToggleProps) => {
	const { currUser, logged } = useUser()
	const favouritesRef = doc(
		db,
		'users',
		`${currUser?.uid}`,
		'favourites',
		`${item?.id}`,
	)

	const deleteFavourite = () => {
		deleteDoc(favouritesRef).then(() => toggleModal())
	}

	const toggle = () => {
		toggleModal()
	}

	return (
		<AnimatePresence exitBeforeEnter>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className='fixed top-0 left-0 right-0 z-50 flex flex-col items-center justify-center w-full h-screen px-2 bg-black-faded'>
				<div className='flex flex-col items-center gap-4 p-4 opacity-100 bg-gray-light'>
					<div className='flex self-end p-2 transition-all duration-500 rounded-md cursor-pointer text-blue-dark justify-self-start hover:text-blue-dark hover:bg-white'>
						<IoCloseOutline onClick={toggle} className='w-6 h-6' />
					</div>
					<div className='flex justify-between w-full '>
						<div className='flex items-center gap-2'>
							<img
								src={`${item?.profileURL}`}
								alt={`${item?.username}`}
								className='w-10 h-10 rounded-full'
							/>
							<h5>{item?.username}</h5>
						</div>

						<div className='flex items-center gap-2'>
							{logged && (
								<IoTrashOutline
									className='w-6 h-6 transition-all duration-500 cursor-pointer text-blue-dark hover:text-red-500'
									onClick={() => deleteFavourite()}
								/>
							)}
							<a
								href={`${item?.link}`}
								target='_blank'
								rel='noopener noreferrer'
								className='flex items-center gap-1 px-4 py-2 rounded-md bg-blue-dark text-gray-light'>
								<IoLinkOutline /> <h5>Link</h5>
							</a>
						</div>
					</div>
					<img
						src={`${item?.photoURL}`}
						alt={`favourite`}
						className='max-h-96'
					/>
				</div>
			</motion.div>
		</AnimatePresence>
	)
}
