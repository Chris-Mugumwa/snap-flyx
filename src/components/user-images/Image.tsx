import { useUser } from '../../hooks/useUser'
import { IoCloseOutline } from 'react-icons/io5'
import { AnimatePresence, motion } from 'framer-motion'
import { db } from '../../firebase'
import {
	deleteDoc,
	DocumentReference,
	DocumentData,
	doc,
} from '@firebase/firestore'
import { IoTrashOutline } from 'react-icons/io5'
export {}

type DetailsProps = {
	toggleModal: () => void
	image: DocumentData
}

export const Image = ({ image, toggleModal }: DetailsProps) => {
	const { currUser } = useUser()
	const imageRef = doc(
		db,
		'users',
		`${currUser?.uid}`,
		'images',
		`${image?.id}`,
	)

	const deleteImage = () => {
		deleteDoc(imageRef).then(() => toggleModal())
	}

	return (
		<AnimatePresence exitBeforeEnter>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className='modal-container'>
				<div className='modal-subcontainer'>
					<div className='flex items-center justify-between w-full'>
						<IoTrashOutline
							className='modal-delete'
							onClick={() => deleteImage()}
						/>
						<div className='modal-close'>
							<IoCloseOutline
								onClick={toggleModal}
								className='w-6 h-6'
							/>
						</div>
					</div>
					<img
						src={`${image?.ImageURL}`}
						alt={`favourite`}
						className='w-auto max-h-96'
					/>
				</div>
			</motion.div>
		</AnimatePresence>
	)
}
