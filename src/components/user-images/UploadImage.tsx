import { useState, useEffect } from 'react'
import { useUser } from '../../hooks/useUser'
import { useModal } from '../../hooks/useModal'
import { storage, db } from '../../firebase'
import {
	collection,
	addDoc,
	onSnapshot,
	DocumentData,
	CollectionReference,
} from 'firebase/firestore'
import toast, { Toaster } from 'react-hot-toast'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { NotLogged } from '../error/NotLogged'
import { UploadDetails } from './UploadDetails'
import { IoAddOutline } from 'react-icons/io5'
import ClipLoader from 'react-spinners/ClipLoader'
import { v4 as uuidv4 } from 'uuid'
import { motion } from 'framer-motion'
import { MasonryGrid } from '../masonry/MasonryGrid'
export {}

const UploadImage = () => {
	const [loading, setLoading] = useState(false)
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const [url, setUrl] = useState<string | null>(null)
	const [id, setId] = useState<string | null>(null)
	const [description, setDescription] = useState<string | null>(null)
	const [file, setFile] = useState<FileList | any>(null)
	const [imageList, setImageList] = useState<DocumentData[]>([])
	const { currUser, logged } = useUser()
	const { open, toggleModal } = useModal()

	useEffect(() => {
		const imagesRef: CollectionReference = collection(
			db,
			'users',
			`${currUser?.uid}`,
			'images',
		)
		onSnapshot(imagesRef, snapshot => {
			setImageList(snapshot?.docs?.map(doc => doc.data()))
		})
	}, [setImageList, currUser?.uid])

	useEffect(() => {
		const imagesRef: CollectionReference = collection(
			db,
			'users',
			`${currUser?.uid}`,
			'images',
		)
		if (imageUrl !== null) {
			addDoc(imagesRef, {
				imageUrl,
				description: file?.name,
				id: uuidv4(),
			})
				.then(() => {
					toast.success('Image added')
				})
				.catch(() => toast.error('Could not upload image, try again.'))
		} else {
			setImageUrl(null)
		}

		return () => {
			setImageUrl(null)
			setFile(null)
		}
	}, [setImageUrl, imageUrl, currUser?.uid])

	const types = ['image/png', 'image/jpeg']
	const handleSubmit = async () => {
		setLoading(true)
		const imageRef = ref(storage, `images/${currUser?.uid}/${file?.name}`)
		if (file && types.includes(file?.type)) {
			await uploadBytes(imageRef, file).then(snapshot => {
				getDownloadURL(snapshot?.ref).then(url => {
					setImageUrl(url)
					setLoading(false)
					setFile(null)
				})
			})
		} else {
			setFile(null)
			toast.error('File needs to be of type jpeg or png')
		}
	}

	const toggle = (url: string, description: string, id: string) => {
		setUrl(url)
		setDescription(description)
		setId(id)
		toggleModal()
	}

	return (
		<section className='flex flex-col items-center gap-4'>
			{!logged && <NotLogged />}
			<Toaster position='top-right' reverseOrder={true} />
			<form className='relative'>
				<input
					type='file'
					name='file'
					id='file'
					onChange={event => setFile(event.target?.files?.[0])}
					className='absolute w-1 h-1 overflow-hidden bg-white opacity-0 -z-10'
				/>
				<label
					htmlFor='file'
					className='w-24 h-24 bg-white rounded-full cursor-pointer'>
					<IoAddOutline className='w-16 h-16 transition duration-300 bg-white rounded-full shadow-md text-blue-dark hover:shadow-lg hover:scale-105' />
				</label>
			</form>
			<p className='font-semibold transition-all duration-500 text-blue-light font-libre-franklin'>
				{file?.name}
			</p>
			<button
				onClick={handleSubmit}
				className={
					file?.name?.length > 0
						? 'transition-all duration-500 px-4 py-2 mt-2 rounded-md bg-blue-dark hover:ring-2 hover:ring-yellow-dark text-gray-light font-libre-franklin w-48 flex justify-center items-center'
						: 'hidden transition-all duration-500'
				}>
				{!loading && <h5>Upload Image</h5>}
				{loading && <ClipLoader color='#FFF' size='20px' />}
			</button>

			<div className='py-10'>
				<MasonryGrid>
					{imageList?.map((url: DocumentData) => (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='relative mb-2 overflow-hidden'
							key={url?.id}>
							<img
								src={`${url?.imageUrl}`}
								alt={`${url?.description}`}
								loading='lazy'
								onClick={() =>
									toggle(url?.imageUrl, url?.description, url?.id)
								}
								className='browse-image'
							/>
						</motion.div>
					))}
				</MasonryGrid>
			</div>

			{open && (
				<UploadDetails
					toggleModal={toggleModal}
					url={url}
					description={description}
					id={id}
				/>
			)}
		</section>
	)
}

export default UploadImage
