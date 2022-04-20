import { useState } from 'react'
import { useRandoms } from '../../hooks/useRandoms'
import { useModal } from '../../hooks/useModal'
import { ImageProps, BreakpointProps } from '../../types/imageProps'
import { ImageDetails } from './ImageDetails'
import Masonry from 'react-masonry-css'
export {}

export const BrowseImages = () => {
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
						<img
							src={`${image?.urls?.regular}`}
							alt={image?.alt_description}
							key={image?.id}
							onClick={() => toggle(image)}
							className='mb-2 cursor-pointer'
						/>
					))}
				</Masonry>

				{open && <ImageDetails toggleModal={toggleModal} item={item} />}
			</div>
		</>
	)
}
