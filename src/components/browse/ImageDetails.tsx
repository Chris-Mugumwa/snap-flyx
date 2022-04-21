import { useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { db } from '../../firebase'
import { doc, setDoc, deleteDoc } from 'firebase/firestore'
import { ImageProps } from '../../types/imageProps'
import { ToastContainer, toast } from 'react-toastify'
import { IoHeartOutline, IoLinkOutline, IoCloseOutline } from 'react-icons/io5'
import { AnimatePresence, motion } from 'framer-motion'
export {}

type ToggleProps = {
	toggleModal: () => void
	item: ImageProps
}

export const ImageDetails = ({ toggleModal, item }: ToggleProps) => {
	const [active, setActive] = useState(false)
	const { currUser, logged } = useUser()
	const favouritesRef = doc(
		db,
		'users',
		`${currUser?.uid}`,
		'favourites',
		`${item?.id}`,
	)

	const addFavourite = async (item: ImageProps) => {
		setActive(prevState => !prevState)
		console.log(active)
		if (!active) {
			setDoc(favouritesRef, {
				id: item.id,
				photoURL: item?.urls?.regular,
			}).then(() => {
				toast('Image added to favourites')
			})
		} else {
			deleteDoc(favouritesRef).then(() => {
				toast('Image removed from favourites')
			})
		}
	}

	const toggle = () => {
		toggleModal()
	}

	return (
		<AnimatePresence exitBeforeEnter>
			<>
				<ToastContainer />
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
									src={`${item?.user?.profile_image?.medium}`}
									alt={`${item?.user?.name}`}
									className='w-10 h-10 rounded-full'
								/>
								<h5>{item?.user?.username}</h5>
							</div>

							<div className='flex items-center gap-2'>
								{logged && (
									<IoHeartOutline
										className={
											active
												? 'w-6 h-6 text-red-600 cursor-pointer hover:scale-105 transition-all duration-500'
												: 'w-6 h-6 text-blue-dark cursor-pointer hover:scale-105 transition-all duration-500'
										}
										onClick={() => addFavourite(item)}
									/>
								)}
								<a
									href={`${item?.user?.links?.html}`}
									target='_blank'
									rel='noopener noreferrer'
									className='flex items-center gap-1 px-4 py-2 rounded-md bg-blue-dark text-gray-light'>
									<IoLinkOutline /> <h5>Link</h5>
								</a>
							</div>
						</div>
						<img
							src={`${item?.urls?.regular}`}
							alt={`${item?.alt_description}`}
							className='max-h-96'
						/>
					</div>
				</motion.div>
			</>
		</AnimatePresence>
	)
}
