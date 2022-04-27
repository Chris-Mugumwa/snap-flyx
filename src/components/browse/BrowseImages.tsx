import { useState } from 'react'
import { useSearch } from '../../hooks/useSearch'
import { useQueryContext } from '../../hooks/useQueryContext'
import { useModal } from '../../hooks/useModal'
import { ImageProps, BreakpointProps } from '../../types/imageProps'
import { ImageDetails } from './ImageDetails'
import Masonry from 'react-masonry-css'
export {}

export const breakpointObj: BreakpointProps = {
	default: 4,
	1100: 3,
	700: 2,
	500: 1,
}

const BrowseImages = () => {
	const [query] = useState('random')
	const [item, setItem] = useState<ImageProps | any>(null)
	const { error } = useSearch(query)
	const { context } = useQueryContext()

	const { open, toggleModal } = useModal()

	const toggle = (item: ImageProps) => {
		setItem(item)
		toggleModal()
	}

	if (error) console.log('An error has occurred')

	return (
		<>
			<div className='w-full py-4 mt-2'>
				<Masonry
					breakpointCols={breakpointObj}
					className='flex w-auto gap-2'>
					{context?.data?.map((image: ImageProps) => (
						<div className='mb-2 overflow-hidden' key={image?.id}>
							<img
								src={`${image?.urls?.regular}`}
								alt={image?.alt_description}
								onClick={() => toggle(image)}
								loading='lazy'
								className='browse-image'
							/>
						</div>
					))}
				</Masonry>

				{open && <ImageDetails toggleModal={toggleModal} item={item} />}
			</div>
		</>
	)
}

export default BrowseImages
