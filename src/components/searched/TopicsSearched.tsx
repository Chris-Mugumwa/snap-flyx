import { useState, useEffect, useCallback, useRef } from 'react'
import { useAppSelector } from '../../app/hooks'
import { getTopicImages } from '../../features/topicImagesSlice'
import { useModal } from '../../hooks/useModal'
import { ImageProps } from '../../types/imageProps'
import { ImageDetails } from '../browse/ImageDetails'
import Masonry from 'react-masonry-css'
import { breakpointObj } from '../browse/BrowseImages'

export {}

const TopicsSearched = () => {
	const [page, setPage] = useState(1)
	const [item, setItem] = useState<ImageProps | any>(null)
	const { open, toggleModal } = useModal()
	const topicImages = useAppSelector(state => state.topic.topicImages)
	console.log(topicImages)

	const loader = useRef<any>(null)

	const handleObserver = useCallback(entries => {
		const target = entries[0]
		if (target.isIntersecting) {
			setPage((prev: number) => prev + 1)
		}
	}, [])

	useEffect(() => {
		const option = {
			root: null,
			rootMargin: '20px',
			threshold: 0,
		}
		const observer = new IntersectionObserver(handleObserver, option)
		if (loader.current) observer.observe(loader.current)
	}, [handleObserver])

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
					{/* {results?.map((image: ImageProps) => (
						<div className='mb-2 overflow-hidden' key={image?.id}>
							<img
								src={`${image?.urls?.regular}`}
								alt=''
								onClick={() => toggle(image)}
								loading='lazy'
								className='browse-image'
							/>
						</div>
					))} */}
				</Masonry>
				{/* {loading && <p>...loading</p>} */}
				<div ref={loader} />

				{open && <ImageDetails toggleModal={toggleModal} item={item} />}
			</div>
		</>
	)
}

export default TopicsSearched
