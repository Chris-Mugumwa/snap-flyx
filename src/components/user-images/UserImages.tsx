import { useState, useEffect } from 'react'
import { useUser } from '../../hooks/useUser'
import { useModal } from '../../hooks/useModal'
import { storage, db } from '../../firebase'
import toast, { Toaster } from 'react-hot-toast'
import {
	doc,
	collection,
	setDoc,
	onSnapshot,
	DocumentData,
} from 'firebase/firestore'
import {
	ref,
	uploadBytes,
	getDownloadURL,
	StorageReference,
} from 'firebase/storage'
import Masonry from 'react-masonry-css'
import { breakpointObj } from '../../components/browse/BrowseImages'
import { NotLogged } from '../error/NotLogged'
import { Image } from './Image'
import { v4 as uuidv4 } from 'uuid'
import { IoAddOutline } from 'react-icons/io5'
import PuffLoader from 'react-spinners/PuffLoader'
export {}

const UserImages = () => {
	const [loading, setLoading] = useState(false)
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const [file, setFile] = useState<FileList | any>(null)
	const [list, setList] = useState<DocumentData[]>([])
	const [image, setImage] = useState<DocumentData>([])
	const { currUser, logged } = useUser()
	const { open, toggleModal } = useModal()
	const imagesRef = collection(db, 'users', `${currUser?.uid}`, 'images')
	const storeRef = doc(
		db,
		'users',
		`${currUser?.uid}`,
		'images',
		`${uuidv4()}`,
	)
	const types = ['image/png', 'image/jpeg']

	useEffect(() => {
		onSnapshot(imagesRef, snapshot => {
			setList(snapshot?.docs?.map(doc => doc.data()))
		})
	}, [setImageUrl, setLoading, imagesRef])

	useEffect(() => {
		setLoading(true)
		if (imageUrl !== null) {
			setDoc(storeRef, {
				id: uuidv4(),
				ImageURL: imageUrl,
			}).then(() => {
				setFile(null)
				setLoading(false)
			})
		} else {
			setImageUrl(null)
		}

		return () => {
			setImageUrl(null)
			setFile(null)
		}
	}, [setImageUrl, imageUrl])

	const handleSubmit = async () => {
		setLoading(true)
		const imageRef = ref(
			storage,
			`images/${currUser?.uid}/${file?.name + uuidv4()}`,
		)
		if (file && types.includes(file?.type)) {
			await uploadBytes(imageRef, file).then(snapshot => {
				getDownloadURL(snapshot?.ref).then(url => {
					console.log(url)
					toast('Image added')
					setImageUrl(url)
				})
			})
		} else {
			setFile([])
			toast('File needs to be of type jpeg or png')
		}
	}

	const toggle = (image: DocumentData) => {
		setImage(image)
		toggleModal()
	}

	return (
		<section className='flex flex-col items-center gap-4'>
			{!logged && <NotLogged />}
			<Toaster />
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
						? 'transition-all duration-500 px-4 py-2 mt-2 rounded-md bg-blue-dark hover:ring-2 hover:ring-yellow-dark text-gray-light font-libre-franklin'
						: 'hidden transition-all duration-500'
				}>
				Upload Image
			</button>

			<div className='py-10'>
				{loading && <PuffLoader color='#14213D' size='60px' />}
				<Masonry
					breakpointCols={breakpointObj}
					className='flex w-auto gap-2'>
					{list?.map((url: DocumentData) => (
						<div className='mb-2 overflow-hidden' key={url?.id}>
							<img
								src={`${url?.ImageURL}`}
								alt='gallery'
								loading='lazy'
								onClick={() => toggle(url)}
								className='browse-image'
							/>
						</div>
					))}
				</Masonry>
			</div>

			{open && <Image toggleModal={toggleModal} image={image} />}
		</section>
	)
}

export default UserImages
