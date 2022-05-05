import { useState } from 'react'
import {useRandoms} from '../../hooks/useRandoms'
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
	const [item, setItem] = useState<ImageProps | any>(null)
	const {loading, randoms} = useRandoms()
	const { open, toggleModal } = useModal()

	const toggle = (item: ImageProps) => {
		setItem(item)
		toggleModal()
	}

	return (
		<>
			{loading && <p>...loading</p>}
			<div className='w-full py-4 mt-2'>
				<Masonry
					breakpointCols={breakpointObj}
					className='flex w-auto gap-2'>
					{randoms?.map((image: ImageProps) => (
						<div className='mb-2 overflow-hidden' key={image?.id}>
							<img
								src={`${image?.urls?.regular}`}
								alt=''
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
