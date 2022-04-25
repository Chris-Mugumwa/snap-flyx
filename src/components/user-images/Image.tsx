import { IoCloseOutline } from 'react-icons/io5'
import { AnimatePresence, motion } from 'framer-motion'
export {}

type DetailsProps = {
	toggleModal: () => void
	image: string
}

export const Image = ({ image, toggleModal }: DetailsProps) => {
	return (
		<AnimatePresence exitBeforeEnter>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className='modal-container'>
				<div className='modal-subcontainer'>
					<div className='modal-close'>
						<IoCloseOutline onClick={toggleModal} className='w-6 h-6' />
					</div>
					<img
						src={`${image}`}
						alt={`favourite`}
						className='w-auto max-h-96'
					/>
				</div>
			</motion.div>
		</AnimatePresence>
	)
}
