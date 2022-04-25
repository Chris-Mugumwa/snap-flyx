import { useState, useEffect } from 'react'
import { useUser } from '../../hooks/useUser'
import { useModal } from '../../hooks/useModal'
import { storage } from '../../firebase'
import { ToastContainer, toast } from 'react-toastify'
import { ref, listAll, uploadBytes, getDownloadURL } from 'firebase/storage'
import Masonry from 'react-masonry-css'
import { breakpointObj } from '../../components/browse/BrowseImages'
import { NotLogged } from '../error/NotLogged'
import { Image } from './Image'
// import { IoAddOutline } from 'react-icons/io5'
export {}

const UserImages = () => {
	const [file, setFile] = useState<FileList | null>(null)
	const [list, setList] = useState<string[]>([])
	const [image, setImage] = useState<string>('')
	const { currUser, logged } = useUser()
	const { open, toggleModal } = useModal()

	const imagesRef = ref(storage, `images/${currUser?.uid}/`)

	useEffect(() => {
		listAll(imagesRef).then(response => {
			response.items.forEach(item => {
				getDownloadURL(item).then(url => {
					if (list === null) return
					setList((prev: string[]) => [...prev, url])
				})
			})
		})
	}, [imagesRef, list])

	const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (file === null) return
		setFile(event.target.files)
		console.log(file)
		const imageRef = ref(storage, `images/${currUser?.uid}/${file[0].name}`)
		if (
			file[0].type.includes('jpeg') ||
			file[0].type.includes('png') ||
			file[0].type.includes('jpg')
		) {
			uploadBytes(imageRef, file[0]).then(snapshot => {
				toast(`Image ${file[0].name} added`)
				console.log('Added')
				getDownloadURL(snapshot.ref).then(url => {
					setList((prev: string[]) => [...prev, url])
				})
			})
		}
	}

	return (
		<section className='flex flex-col items-center gap-4'>
			{!logged && <NotLogged />}
			<ToastContainer />
			<form className='relative'>
				<input
					type='file'
					name='file'
					accept='image/*'
					onChange={handleSubmit}
				/>
				<button>submit</button>
			</form>

			<div className='py-10'>
				<Masonry
					breakpointCols={breakpointObj}
					className='flex w-auto gap-2'>
					{list?.map((url: string) => (
						<div className='mb-2 overflow-hidden' key={url}>
							<img
								src={`${url}`}
								alt={url}
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
