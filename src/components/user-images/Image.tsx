import { useState, useEffect } from 'react'
import { useUser } from '../../hooks/useUser'
import { db } from '../../firebase'
import {
	doc,
	deleteDoc,
	collection,
	query,
	where,
	getDocs,
} from 'firebase/firestore'
import { IoCloseOutline, IoTrashOutline } from 'react-icons/io5'
import { AnimatePresence, motion } from 'framer-motion'
export {}

type DetailsProps = {
	url: string | null
	description: string | null
	id: string | null
	toggleModal: () => void
}

export const Image = ({ toggleModal, url, description, id }: DetailsProps) => {
	const [docId, setDocId] = useState<any>(null)
	const { currUser } = useUser()

	useEffect(() => {
		const colRef = collection(db, 'users', `${currUser?.uid}`, 'images')
		const q = query(colRef, where('id', '==', `${id}`))
		const getId = async () => {
			const querySnapshot = await getDocs(q)
			querySnapshot.forEach(doc => setDocId(doc?.id))
		}

		getId()
	}, [id, currUser?.uid])

	const deleteImage = async () => {
		if (docId !== null) {
			const imageRef = await doc(
				db,
				'users',
				`${currUser?.uid}`,
				'images',
				`${docId}`,
			)
			await deleteDoc(imageRef).then(() => {
				toggleModal()
			})
		}
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
						<div className='modal-close' onClick={deleteImage}>
							<IoTrashOutline className='w-6 h-6' />
						</div>
						<div className='modal-close' onClick={toggleModal}>
							<IoCloseOutline className='w-6 h-6' />
						</div>
					</div>
					<img
						src={`${url}`}
						alt={`${description}`}
						className='w-auto max-h-96'
					/>
				</div>
			</motion.div>
		</AnimatePresence>
	)
}
