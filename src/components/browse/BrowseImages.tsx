import { useState } from 'react'
import { useRandoms } from '../../hooks/useRandoms'
import { useModal } from '../../hooks/useModal'
import { ImageProps, BreakpointProps } from '../../types/imageProps'
import { ImageDetails } from './ImageDetails'
import Masonry from 'react-masonry-css'
export {}

const BrowseImages = () => {
	const [item, setItem] = useState<any>({})
	const { images } = useRandoms('50')
	const { open, toggleModal } = useModal()

	const breakpointObj: BreakpointProps = {
		default: 4,
		1100: 3,
		700: 2,
		500: 1,
	}

	const toggle = (item: ImageProps) => {
		setItem(item)
		toggleModal()
	}

	return (
		<>
			<div className='w-full py-4 mt-2'>
				<Masonry
					breakpointCols={breakpointObj}
					className='flex w-auto gap-2'>
					{images?.map((image: ImageProps) => (
						<div className='overflow-hidden' key={image?.id}>
							<img
								src={`${image?.urls?.regular}`}
								alt={image?.alt_description}
								onClick={() => toggle(image)}
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
