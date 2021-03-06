import { useUser } from '../../hooks/useUser'
import { db } from '../../firebase'
import { doc, deleteDoc, DocumentData } from 'firebase/firestore'
import { IoTrashOutline, IoLinkOutline, IoCloseOutline } from 'react-icons/io5'
import { AnimatePresence, motion } from 'framer-motion'
export {}

type ToggleProps = {
	item: DocumentData
	toggleModal: () => void
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
				className='modal-container'>
				<div className='modal-subcontainer'>
					<div className='modal-close ' onClick={toggle}>
						<IoCloseOutline className='w-6 h-6' />
					</div>
					<div className='flex justify-between w-full '>
						<div className='flex items-center gap-2'>
							<img
								src={`${item?.profileURL}`}
								alt={`${item?.username}`}
								className='w-10 h-10 rounded-full'
							/>
						</div>

						<div className='flex items-center gap-2'>
							{logged && (
								<div
									className='modal-close '
									onClick={() => deleteFavourite()}>
									<IoTrashOutline className='w-6 h-6' />
								</div>
							)}
							<a
								href={`${item?.link}`}
								target='_blank'
								rel='noopener noreferrer'
								className='modal-link'>
								<IoLinkOutline /> <h5>Link</h5>
							</a>
						</div>
					</div>
					<img
						src={`${item?.photoURL}`}
						alt={`favourite`}
						className='min-w-full max-h-96 max-w-96'
					/>
				</div>
			</motion.div>
		</AnimatePresence>
	)
}
