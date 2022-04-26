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
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import Masonry from 'react-masonry-css'
import { breakpointObj } from '../../components/browse/BrowseImages'
import { NotLogged } from '../error/NotLogged'
import { Image } from './Image'
import { v4 as uuidv4 } from 'uuid'
import { IoAddOutline } from 'react-icons/io5'
export {}

const UserImages = () => {
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const [file, setFile] = useState<FileList | any>([])
	const [list, setList] = useState<DocumentData[]>([])
	const [image, setImage] = useState<string>('')
	const { currUser, logged } = useUser()
	const { open, toggleModal } = useModal()
	const imagesRef = collection(db, 'users', `${currUser?.uid}`, 'images')
	// const imagesRef = ref(storage, `images/${currUser?.uid}/`)

	const types = ['image/png', 'image/jpeg']

	useEffect(() => {
		onSnapshot(imagesRef, snapshot => {
			setList(snapshot?.docs?.map(doc => doc.data()))
		})
	}, [setList, imagesRef, setImageUrl])

	useEffect(() => {
		console.log('First')
		if (imageUrl !== null) {
			console.log('Second')
			const storeRef = doc(
				db,
				'users',
				`${currUser?.uid}`,
				'images',
				`${uuidv4()}`,
			)
			setDoc(storeRef, {
				id: uuidv4(),
				ImageURL: imageUrl,
			}).then(() => {
				setFile([])
				console.log('Added to firestore')
			})
		} else {
			setImageUrl(null)
			console.log('Third')
		}

		return () => {
			setImageUrl(null)
			console.log('Fourth')
		}
	}, [setImageUrl, imageUrl])

	const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
		let userImage = event.target?.files?.[0]
		console.log(userImage)
		const imageRef = ref(
			storage,
			`images/${currUser?.uid}/${userImage?.name + uuidv4()}`,
		)

		if (userImage && types.includes(userImage.type)) {
			setFile(userImage)
			await uploadBytes(imageRef, file).then(snapshot => {
				getDownloadURL(snapshot?.ref).then(url => {
					console.log(url)
					toast('Image added')
					setImageUrl(url)
					console.log('Image added')
				})
			})
		} else {
			setFile(null)
			toast('File needs to be of type jpeg or png')
		}
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
					onChange={handleSubmit}
					className='absolute w-1 h-1 overflow-hidden bg-white opacity-0 -z-10'
				/>
				<label
					htmlFor='file'
					className='w-24 h-24 bg-white rounded-full cursor-pointer'>
					<IoAddOutline className='w-16 h-16 transition duration-300 bg-white rounded-full shadow-md text-blue-dark hover:shadow-lg hover:scale-105' />
				</label>
			</form>

			<div className='py-10'>
				<Masonry
					breakpointCols={breakpointObj}
					className='flex w-auto gap-2'>
					{list?.map((url: DocumentData) => (
						<div className='mb-2 overflow-hidden' key={url?.id}>
							<img
								src={`${url?.ImageURL}`}
								alt='gallery'
								loading='lazy'
								onClick={() => setImage(image)}
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
