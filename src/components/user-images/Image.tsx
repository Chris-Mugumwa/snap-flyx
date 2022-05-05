import { useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { storage } from '../../firebase'
import { DocumentData } from 'firebase/firestore'
import { IoCloseOutline, IoTrashOutline } from 'react-icons/io5'
import { AnimatePresence, motion } from 'framer-motion'
export {}

type DetailsProps = {
	url: string | null
	description: string | null
	toggleModal: () => void
}

export const Image = ({ toggleModal, url, description }: DetailsProps) => {
	return (
		<AnimatePresence exitBeforeEnter>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className='modal-container'>
				<div className='modal-subcontainer'>
					<div className='flex items-center justify-between w-full'>
						<div className='menu-close'>
							<IoTrashOutline className='w-6 h-6 modal-delete' />
						</div>
						<div className='modal-close'>
							<IoCloseOutline
								onClick={toggleModal}
								className='w-6 h-6'
							/>
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
