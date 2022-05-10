import { useState } from 'react'
import { useSearch } from '../../hooks/useSearch'
import { useModal } from '../../hooks/useModal'
import { ImageProps } from '../../types/imageProps'
import { ImageDetails } from '../browse/ImageDetails'
import Masonry from 'react-masonry-css'
import { breakpointObj } from '../browse/BrowseImages'

export {}

const Searched = () => {
	const [query, setQuery] = useState('')
	const [item, setItem] = useState<ImageProps | any>(null)
	const { open, toggleModal } = useModal()
	const { error } = useSearch(query)

	const toggle = (item: ImageProps) => {
		setItem(item)
		toggleModal()
	}

	if (error) console.log('An error has occurred')

	return (
		<div className='w-full py-4 mt-2'>
			<Masonry breakpointCols={breakpointObj} className='flex w-auto gap-2'>
				{/* {context?.data?.map((image: ImageProps) => (
					<div className='mb-2 overflow-hidden' key={image?.id}>
						<img
							src={`${image?.urls?.regular}`}
							alt=''
							onClick={() => toggle(image)}
							loading='lazy'
							className='browse-image'
						/>
					</div> */}
				{/* ))} */}
			</Masonry>

			{open && <ImageDetails toggleModal={toggleModal} item={item} />}
		</div>
	)
}

export default Searched
